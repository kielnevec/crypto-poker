#run interactive
#docker run -it poker-payment-server -e POKER_MONGODB='d188cf9b6e49' sh  

#package
#docker build . -t poker-payment-server

#get the IP address of mongodb
#docker container inspect <container_id>

#run
#docker run --name PokerPaymentServer -p 8113:8113 -e POKER_MONGODB=172.17.0.3 -d poker-payment-server

#view logs
#docker logs e2ff0fd0e610


FROM node:12

# Create app directory
WORKDIR /usr/src/poker.payments

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY .env ./

RUN npm i
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./build .

EXPOSE 8113

CMD [ "node", "./poker.payments/src/PaymentProcessorBootstrapper.js" ]