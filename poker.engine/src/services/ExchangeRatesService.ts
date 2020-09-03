import { IDataRepository } from "./documents/IDataRepository";
import { ExchangeRate } from "../../../poker.ui/src/shared/ExchangeRate";
import { IBroadcastService } from "./IBroadcastService";
import { DataContainer, ExchangeRateResult } from "../../../poker.ui/src/shared/DataContainer";
import { ExchangeRatesChangedHandler } from "./ExchangeRatesChangedHandler";
var http = require('request-promise-native');
var log4js = require('log4js');
var logger = log4js.getLogger();
import {to} from '../shared-helpers';
import environment from '../environment';

export class ExchangeRatesService {
  
  currencies: ExchangePollPair[] = [];
  constructor(private dataRepository: IDataRepository, private exchangeRatesChangedHandler:ExchangeRatesChangedHandler) {
    
  }

  async startPolling() : Promise<void> {    
   await this.loadExchangePairs();
    return this.pollExchangeRateApi();    
  }

  async loadExchangePairs(){
    let currencyConfig = await this.dataRepository.getCurrencyConfigs();
    this.currencies = currencyConfig.filter(c=>!c.doNotPoll).map(t=>new ExchangePollPair(t.name, t.exchange));   
  }
  
  
  async pollExchangeRateApi(): Promise<void> {
    //let arr:ExchangeRate[] = await Promise.all(this.currencies.map(c => { return this.pollCurrency(c) }))
    let arr: ExchangeRate[] = await this.pollCurrencies();
    for (let exchangeRate of arr) {
      await this.dataRepository.saveExchangeRate(exchangeRate);
    }

    this.exchangeRatesChangedHandler.run(arr);
    if(!environment.debug)
      setTimeout(this.pollExchangeRateApi.bind(this), 30000);
  }

  async pollCurrencies(): Promise<ExchangeRate[]> {

    let currencyQuery = this.currencies.map(c => c.currency.toUpperCase()).join(',');
    let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${currencyQuery}&tsyms=USD`;
    let [err, data] = await to(http({
      method: 'GET',
      uri: url,
      json: true
    }));
    let arr: ExchangeRate[] = [];
    if (data) {
      for (let key in data.RAW) {
        let currencyObj = data.RAW[key].USD;
        if(!isNaN(parseFloat(currencyObj.PRICE)) && !isNaN(parseFloat(currencyObj.VOLUME24HOUR)) && !isNaN(parseFloat(currencyObj.CHANGE24HOUR))){
          let exchangeRate = new ExchangeRate();
          exchangeRate.base = key.toLowerCase();
          exchangeRate.target = 'usd';
          exchangeRate.price = currencyObj.PRICE;
          exchangeRate.volume = Math.round(currencyObj.VOLUME24HOUR);
          exchangeRate.change = currencyObj.CHANGE24HOUR;
          arr.push(exchangeRate);
        }else{
          logger.info(`could not parse poll data ${JSON.stringify(currencyObj)}`);
        }
        
      }
    } else {
      logger.info('pollCurrency error: ' + err)
    }

    
    return arr;
  }

  async pollCurrency2(pair:ExchangePollPair): Promise<ExchangeRate> {
    let url:string;
    if(pair.exchange=="hitbtc"){
      url = `https://api.hitbtc.com/api/1/public/CHPETH/ticker`;
    }else{
      url = `https://api.cryptonator.com/api/ticker/${pair.currency}-usd`;      
    }   
    
    var options = {
      method: 'GET',
      uri: url,
      json: true
    };
    let exchangeRate:ExchangeRate;
    let [err,data] = await to(http(options));
    if(data){
      if(pair.exchange=="hitbtc"){
          if(data.last){
            let ethExchangeRate = await this.dataRepository.getExchangeRate('eth');
            if(ethExchangeRate && ethExchangeRate.price){
              exchangeRate = new ExchangeRate();
              exchangeRate.base = pair.currency.toLowerCase();            
              exchangeRate.target = "usd";
              let price = parseFloat(data.last);  
              price = parseFloat((price * ethExchangeRate.price).toFixed(2));  
              exchangeRate.price = price;                             
              exchangeRate.volume = parseFloat(data.volume); 
            }                       
          }
      }else{
        if (data.success) {
          exchangeRate = new ExchangeRate();
          exchangeRate.base = data.ticker.base.toLowerCase();
          exchangeRate.target = data.ticker.target.toLowerCase();
          exchangeRate.price = parseFloat(parseFloat(data.ticker.price).toFixed(2));
          exchangeRate.volume = parseFloat(data.ticker.volume);
          exchangeRate.change = parseFloat(data.ticker.change);              
        }
      }
    }else{
      logger.info('pollCurrency error: '+ err)
    }
    
    
    return exchangeRate;
  }




}
class ExchangePollPair {
  
  constructor(public currency:string, public exchange:string) {
    
    
  }
}