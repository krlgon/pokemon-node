const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokemon API',
      version: '1.0.0',
      description: 'Microservicio Pokemon con Node.js y MySQL'
    },
    servers: [{ url: 'http://localhost:3001' }],
    components: {
      schemas: {
        PokemonCharacter: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Pikachu' },
            species: { type: 'string', example: 'Mouse Pokemon' },
            type: { type: 'string', example: 'Electric' },
            ability: { type: 'string', example: 'Static' },
            region: { type: 'string', example: 'Kanto' },
            image_url: { type: 'string', example: 'https://example.com/pikachu.png' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
});

module.exports = swaggerSpec;

