FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ENV mongoURI="mongodb://database:27017/staff_clock_in_out_app"

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
