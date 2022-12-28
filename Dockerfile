FROM node:18.12.1

WORKDIR /home/node/template
COPY ./package*.json ./

RUN npm install
RUN npm install --global pm2

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 8080
CMD [ "pm2-runtime", "npm start" ]
