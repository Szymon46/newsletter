FROM node:25
WORKDIR /app/server
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]