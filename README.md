# crypto-poker
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 tldr
 This software is a hobby/research project - you are allowed to use it for ANY purpose (including commercial) but the software is provided "as is" without ANY warranty of any kind. Online poker is restricted in some jurisdictions - do your research
 
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



