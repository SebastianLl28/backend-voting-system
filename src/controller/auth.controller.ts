import { Request, Response } from 'express'
import { LoginSchema } from '../schema/auth.schema'
import { findUserCreatedByEmail } from '../service/user.service'
import { generateToken } from '../helpers/jwt'

export const postLogin = async (req: Request<unknown, unknown, LoginSchema>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const findEmail = await findUserCreatedByEmail(email)
    if (findEmail === null) {
      res.status(404).json({ message: 'correo o contraseña incorrecta' })
      return
    }
    if (findEmail.password !== password) {
      res.status(404).json({ message: 'correo o contraseña incorrecta' })
      return
    }
    const token = generateToken({ id: findEmail.id, email: findEmail.email, name: findEmail.name })
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' })
    console.log(error)
  }
}
