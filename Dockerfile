FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 8080 
CMD npx nodemon --inspect=0.0.0.0:9229--signal SIGINT --nolazy index.js