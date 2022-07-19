git rev-parse --short HEAD | Out-File -FilePath .version -Encoding UTF8
$version = Get-Content .version
cd ../poker.ui/
Remove-Item ./scripts -Recurse -Force
sudo apt install python2 -y
npm install node-sass
sudo npm install aurelia-cli -g
sudo npm install typescript -g
npm install
au build --env prod
mv ./scripts/app-bundle.js ./scripts/app-bundle-$version.js
mv ./scripts/vendor-bundle.js ./scripts/vendor-bundle-$version.js
(Get-Content index.html).replace('scripts/vendor-bundle.js', "scripts/vendor-bundle-$version.js") | Set-Content index.html
(Get-Content index.html).replace('http://localhost:9000', '') | Set-Content index.html
(Get-Content "./scripts/vendor-bundle-$version.js").replace('../scripts/app-bundle', "/scripts/app-bundle-${version}") | Set-Content "./scripts/vendor-bundle-$version.js"
cd ../
mkdir -p build && cp poker.ui/*.html ./build/.
cp poker.ui/favicon.ico ./build/.
cp poker.ui/images/. ./build/images/ -r
cp poker.ui/scripts/. ./build/scripts/ -r
cp poker.ui/sounds/. ./build/sounds/ -r
cp ./build/. /var/www/poker.site/. -r
Remove-Item -Recurse -Force ./build/
cd poker.engine
npm install bcrypt@5.0.1
npm install node-sass
npm install
(Get-Content src/environment.ts).replace('debug: true', "debug: false") | Set-Content src/environment.ts
tsc
cp ../scripts/.version ./build/poker.engine/src/.
cd ..
cp poker.engine/. /opt/poker/poker.engine/. -r
cp ./scripts/.version /opt/poker/poker.engine/build/poker.engine/src/.
cd /opt/poker/poker.engine/
#forever start --killSignal=SIGTERM ./build/poker.engine/src/app.js
#node ./build/poker.engine/src/app.js