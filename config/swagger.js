const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Shoes-ya",
      version: "1.0.0",
       description: 'Documentación de la API de la pagina web shoes-ya'
    },
  },
  apis: ["./src/routes/*.js"], // Archivos donde defines tus rutas
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
