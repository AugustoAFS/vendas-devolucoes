import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sales & Refunds API',
      version: '1.0.0',
      description: 'API para pareamento de vendas e devoluções a partir de CSV'
    },
    servers: [
      {
        url: 'http://localhost:3333/api',
        description: 'Servidor Local'
      }
    ]
  },
  apis: [
    './src/modules/**/*.ts',
    './src/routes/*.ts',
    './dist/modules/**/*.js',
    './dist/routes/*.js'
  ]
};

export default swaggerJsdoc(options);
