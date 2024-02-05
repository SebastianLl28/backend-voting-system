import { z } from 'zod'

// model User {
//   id       Int    @id @default(autoincrement())
//   name     String
//   lastName String
//   email    String @unique
//   password String
//   state    State  @default(ACTIVE)
// }

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'El nombre es requerido',
      invalid_type_error: 'El nombre debe ser un string'
    }),
    lastName: z.string({
      required_error: 'El apellido es requerido',
      invalid_type_error: 'El apellido debe ser un string'
    }),
    email: z.string({
      required_error: 'El email es requerido',
      invalid_type_error: 'El email debe ser un string'
    }).email('El email no es valido'),
    password: z.string({
      required_error: 'La contraseña es requerida',
      invalid_type_error: 'La contraseña debe ser un string'
    }).min(8, 'La contraseña debe tener como minimo 8 caracteres')
  })
})

export type CreateUserSchema = z.infer<typeof createUserSchema>['body']
