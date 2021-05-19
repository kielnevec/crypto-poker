#run interactive
#docker run -it poker-payment-server sh

#package
#docker build . -t poker-payment-server

#run
#docker run -p 8113:8113 -d poker-payment-server
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