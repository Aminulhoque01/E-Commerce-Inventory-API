import swaggerJSDoc from 'swagger-jsdoc';

// Swagger definition (metadata)
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Promo API Documentation',
    version: '1.0.0',
    description: 'API documentation for the Promo service',
  },
  servers: [
    {
      url: 'http://localhost:8080/api/v1', // Make sure the URL matches your API
    },
  ],
};

// Swagger options
const options = {
  swaggerDefinition,
   apis: [
    './src/app/modules/promo/promo.route.ts',
    './src/app/modules/catalog/catalog.route.ts',  // Catalog routes
    './src/app/modules/cart/cart.route.ts',
    './src/app/modules/order/order.route.ts',

   ], // Path to your route file with JSDoc
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
