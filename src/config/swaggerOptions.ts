import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Voting System',
    version: '1.0.0',
    description: 'A simple express library API'
  },
  components: {
    schemas: {
      Poll: {
        type: 'object',
        required: ['title', 'userId'],
        properties: {
          id: { type: 'number' },
          userId: { type: 'number' },
          title: { type: 'string' },
          description: { type: 'string' },
          create_at: { type: 'string', format: 'date-time' },
          uptadateAt: { type: 'string', format: 'date-time' },
          finish_date: { type: 'string', format: 'date-time' }
        }
      }
    },
    securitySchemes: {
      headerScurity: {
        type: 'apiKey',
        in: 'header',
        name: 'token'
      }
    }
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/router/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
