FROM node:12

# Create app directory
WORKDIR /usr/src/poker.payments

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./build .

EXPOSE 8113

CMD [ "node", "./build/poker.payments/src/PaymentProcessorBootstrapper.js" ]