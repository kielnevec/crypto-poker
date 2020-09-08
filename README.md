# crypto-poker
 
 ![screenshot](https://i.imgur.com/aLDDolt.png "Screenshot")

[LIVE DEMO](https://troyshouse.poker/)
=====

Prerequisites
1) node v10 or later
2) mongodb
3) typescript (`sudo npm i typescript -g`)
3) aurelia (`sudo npm install aurelia-cli@0.34.0 -g`)

Getting Started

1) Run the client
```
cd poker.ui
au run -w
```

2) Run the server
```
cd poker.engine
npm i
tsc
cp src/email/standard_template.html ./build/poker.engine/src/email/
cp ../scripts/vagrant/game_server/install_files/game_server.env ./build/poker.engine/.env
cd ./build/poker.engine
node ./src/app.js
```

There are also ~300 unit tests for the engine.
```
cd poker.engine
npm test
```



