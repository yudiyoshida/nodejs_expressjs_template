import dataSource from '@database/data-source';
import app from './app';

async function start() {
  try {
    // it checks database's connection before running the server.
    await dataSource.$connect();

    app.server.listen(process.env.PORT, () => {
      console.log('Projeto iniciado com sucesso!');
      console.log(`Documentação da API disponível em ${process.env.APP_URL}/swagger`);
    });

  } catch (err: any) {
    console.log('Erro ao iniciar o projeto!');
    console.log(err);

  }
}
start();
