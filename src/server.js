require("dotenv/config");
const http = require("http");
const https = require("https");

const { app } = require("./app");
const sslConfig = require("./config/ssl");
const DataSource = require("./database/data-source");

async function start(port) {
  try {
    let server;
    
    await DataSource.$connect();
    server = (process.env.NODE_ENV === "production") ? https.createServer(sslConfig, app) : http.createServer(app);
    server.listen(port, () => {
      console.log("Projeto iniciado com sucesso!");
      console.log(`Documentação da API disponível em ${process.env.APP_URL}/api-docs`);
    });

  } catch(err) {
    console.log("Erro ao iniciar o projeto.");
    console.log(err);

  }
}

start(process.env.PORT);