FROM node:18-alpine

ADD ./ /home/node/template
WORKDIR /home/node/template

COPY . .

RUN npm install
RUN npm install --global pm2
RUN npm run build

CMD [ "pm2-runtime", "npm start" ]

EXPOSE 8080
