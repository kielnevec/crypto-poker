import { Db, Server ,MongoClient} from 'mongodb';
import { PokerProcessor } from "./poker-processor";
import { WebSocketHandle } from "./model/WebSocketHandle";
import express = require('express');
var bodyParser = require('body-parser');
import { TableConfig } from './model/TableConfig';
import http = require('http');
var expressValidator = require('express-validator');       // https://npmjs.org/package/express-validator
var cors = require('cors');
var logger = require('log4js').getLogger();
import WebSocket = require('ws');
import { AdminServer } from "./admin/AdminServer";
import { IpLookupResult } from './ip-lookup';
import { IDataRepository } from "./services/documents/IDataRepository";
import { ActivateRequestHandler } from './handlers/ActivateRequestHandler';
import { ResetRequestHandler } from './handlers/ResetRequestHandler';
var crypto = require('crypto');
import fs = require('fs');
import { AdminSecureSocketService, IConnectionToPaymentServer } from './admin/AdminSecureSocketService';
import { BlockCypherPaymentEvent } from "./admin/model/outgoing/BlockCypherPaymentEvent";
import { GameServerProcessor } from "./admin/processor/GameServerProcessor";
import { getUserData,getTableViewRow } from "./helpers";
import {SaveUserEmail } from './model/SaveUserEmail'
import { DbGameResults } from './model/table/DbGameResults';
import { RewardsDetails } from './model/table/RewardsDetails';
import { IPokerTableProvider } from "./services/IBroadcastService";
import {Table} from './table'
// import {  Db  } from 'mongodb';
export class ApiEndpoints {

    db: Db;
    dbName: string = "PokerGameServer";
  
    app: any;
    server: any;
    wss: any;
    adminServer: AdminServer;
    activateRequestHandler: ActivateRequestHandler;
    resetRequestHandler: ResetRequestHandler;

       constructor(private dataRepository: IDataRepository, private pokerProcessor: PokerProcessor, private connectionToPaymentServer: IConnectionToPaymentServer, private processor: GameServerProcessor) {
      
        this.dbConnection()
    }
   async dbConnection(){
    this.db=  await MongoClient.connect(process.env.mongoDBHost);

    }

    setup() {

        let app = express();
        app.use(cors({ origin: '*' }));
        app.use(bodyParser.json());
        app.use(expressValidator());// Form validation - This line must be immediately after bodyParser
        this.app = app;

        let server = http.createServer(app);
        this.wss = new WebSocket.Server({
            server,
            verifyClient: (info, done) => { this.pokerProcessor.verifyClient(info, done); }
        });
        this.server = server;

        this.activateRequestHandler = new ActivateRequestHandler(this.dataRepository);
        this.resetRequestHandler = new ResetRequestHandler(this.dataRepository);

        this.setupEndpoints();
        this.listen();
    }
    listen() {
        let server = this.server;
        server.listen(8111, function listening() { logger.info('Listening on %d', server.address().port); });
        this.adminServer = new AdminServer(this.dataRepository, this.pokerProcessor, this.connectionToPaymentServer, this.processor);
        this.adminServer.init();
    }
    setupEndpoints() {

        let app = this.app;
        let wss = this.wss;
        let pokerProcessor = this.pokerProcessor;
        this.dataRepository = this.dataRepository;
        wss.on("headers", (headers: string[], request: http.IncomingMessage) => {
            let customData = (<any>request).customData;
            let guid: string;
            let loginFailed = customData.sid && !customData.guid;

            let extGuid=pokerProcessor.getCookie(request.headers, "guid") 
            let newGuid=new URL("http://localhost+"+request.url).searchParams.get("guid")
            
            if (customData.guid) {
                guid = customData.guid;
            }

            // else if (newGuid!==extGuid || !extGuid || loginFailed) {
               if(newGuid && newGuid!="null"){
                     guid=newGuid
               }else{
                guid = crypto.randomBytes(20).toString('hex');
               }
               request.headers.cookie = `guid=${guid};isNewUser=1`;
            // }
            if (guid) {
                headers.push(`Set-Cookie: guid=${guid}; Expires=Wed, 12 Sep 2037 07:28:00 GMT`);
            }
        });

        wss.on('connection', async (socket: any, httpReq: any) => {

            let handle: WebSocketHandle = await pokerProcessor.connection(socket, httpReq)
            if (handle) {
                
                logger.info(`${handle.user.screenName}:${handle.id} connected from ${handle.ipAddress} ${handle.country}. app_version:${httpReq.customData.version}  clients.length: ${pokerProcessor.clients.length}`);


            }
        });

        app.post('/api/activate', async (req: any, res: any) => { this.activateRequestHandler.run(req, res); });
        app.get('/api/reset', async (req: any, res: any) => {
            this.resetRequestHandler.get(req, res);
        });
        app.post('/api/reset', async (req: any, res: any) => { this.resetRequestHandler.post(req, res); });

        app.get('/api/countryCheck', async (req: any, res: any) => {
            //let ipAddress = '220.253.185.64';
            let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            //logger.info(`x-forwarded-for:${req.headers['x-forwarded-for']} req.connection.remoteAddress:${req.connection.remoteAddress}`);
            logger.info(`countryCheck from ${ipAddress}`);
            let iplookupResult: IpLookupResult = this.pokerProcessor.ipLookup.lookup(ipAddress);
            let success: boolean = true;
            let country: string = '';
            if (iplookupResult && !req.query.b) {
                success = this.pokerProcessor.isAllowedCountry(iplookupResult.countryCode);
                country = iplookupResult.countryName;
            }
            res.send({ success: success, country: country });
        });

        app.get('/api/tables', async (req:any, res:any) => {
             
            let tableList  = await pokerProcessor.getTables().map(getTableViewRow);
            let data= await this.dataRepository.getRewardsReport()
            let rewards = [];
        let i=0
        console.log("updating leaderboard data");
            for (let result of data || []) {
                i++
              let dailyMission = 0
              let fireWinning = 0
              if (result.misProgress) {
                if (result.misProgress.a === 100) {
                  dailyMission++
                  fireWinning += 10
        
                }
                if (result.misProgress.b === 100) {
                  dailyMission++
                  fireWinning += 50
                }
                if (result.misProgress.c === 100) {
                  dailyMission++
                  fireWinning += 100
                }
              }
              let view = {
                rank:i,
                guid: "anon" + result.guid.substring(0, 4),
                profitLoss: result.profitLoss,
                percentile: result.percentile,
                fireWinning: fireWinning,
        
                dailyMission: dailyMission + "/3"
              };
              rewards.push(view);
            }
        

            res.send({tableList,rewards});
          });    
      

        // POST method route
        var paymentCallbackIndex: number = 1;
        app.post('/api/payment-callback', (req: any, res: any) => {
            logger.info('payment callback for address guid: ', req.query.guid);
            fs.writeFile(`event_${req.query.guid}_${paymentCallbackIndex}.json`, JSON.stringify(req.body), (err: any) => {
                if (err) { logger.error(err); };
            });
            paymentCallbackIndex++;
            let event = new BlockCypherPaymentEvent();
            event.tx = req.body;
            event.guid = req.query.guid
            this.connectionToPaymentServer.send(event)
            res.send({
                guid: req.query.guid
            });


        });
        app.post('/api/saveEmail', async (req: any, res: any) => {
            let saveUserEmail = new SaveUserEmail()
            saveUserEmail.userEmail=req.body.userEmail
            saveUserEmail.userSolanaAdd=req.body.userSolanaAdd
            saveUserEmail.createdDate=new Date();
            this.dataRepository.saveUserEmail(saveUserEmail)
            res.send({ success: "success" });
        });

        app.post('/api/rewards', async (req:any, res:any) => {
            let rewards  = await this.dataRepository.getRewards("b36c39b9b7480d78fc697dabeb7d940b95dc2a2d");
            res.send(rewards);
        });
        


    }
}