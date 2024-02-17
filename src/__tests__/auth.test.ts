import request from 'supertest'
import app from '../app'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

describe('AUTH', () => {
  describe('POST /auth/login', () => {
    it('should respond with a 200 status code and token', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'llamucasebas@gmail.com',
        password: '123456789'
      })
      expect(response.statusCode).toBe(200)
      expect(response.body.token).toBeDefined()
      expect(jwt.verify(response.body.token, process.env.JWT_SECRET as string)).toBeDefined()
    })

    it('should ignore extra fields in the request', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'llamucasebas@gmail.com',
          password: '123456789',
          extraField: 'extra_value'
        })
      expect(response.statusCode).toBe(200)
      expect(response.body.token).toBeDefined()
    })

    it('should respond with a 404 status code', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'asdasdasdasdas@gmail.com',
        password: '12345678'
      })
      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe('correo o contraseña incorrecta')
    })

    it('should respond with a 400 status code if the email and password are not in a proper format', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'invalidemail',
        password: '123'
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual([
        {
          path: 'email',
          message: 'Invalid email'
        },
        {
          path: 'password',
          message: 'String must contain at least 8 character(s)'
        }
      ])
    })

    it('should respond with a 400 status code for missing email and password', async () => {
      const response = await request(app).post('/auth/login').send({})

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual([
        {
          path: 'email',
          message: 'Required'
        },
        {
          path: 'password',
          message: 'Required'
        }
      ])
    })
  })
})
