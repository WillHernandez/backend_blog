FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 8080 
# CMD npx nodemon index.js : replaced by command in docker-compose