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
        required: ['id', 'title', 'userId', 'create_at', 'uptadateAt'],
        properties: {
          id: { type: 'number' },
          userId: { type: 'number' },
          title: { type: 'string' },
          description: { type: 'string' },
          create_at: { type: 'string', format: 'date-time' },
          uptadateAt: { type: 'string', format: 'date-time' },
          finish_date: { type: 'string', format: 'date-time' }
        }
      },
      User: {
        type: 'object',
        required: ['id', 'name', 'lastName', 'email', 'password', 'state'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          state: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'DELETED'], default: 'ACTIVE' }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/router/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
