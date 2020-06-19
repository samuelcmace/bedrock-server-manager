FROM ubuntu

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt-get update
RUN DEBIAN_FRONTEND="noninteractive" apt-get install unzip nodejs npm libcurl4-openssl-dev -y

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
EXPOSE 19132/udp

# RUN wget https://minecraft.azureedge.net/bin-linux/bedrock-server-1.14.60.5.zip
RUN cd server && unzip bedrock-server-1.14.60.5.zip

CMD [ "node", "server.js" ]
