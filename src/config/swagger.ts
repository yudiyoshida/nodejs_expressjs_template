export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '[name] REST API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://127.0.0.1:3000',
        description: 'Development environment',
      },
      {
        url: process.env.APP_URL,
        description: 'Testing environment',
      },
    ],
  },
  apis: ['docs/**/*.yml'],
};
