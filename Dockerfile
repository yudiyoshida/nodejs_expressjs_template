FROM node:18.13.0

WORKDIR /home/node/template
COPY ./package*.json ./

RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
