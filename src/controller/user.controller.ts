import { Request, Response } from 'express'
import { CreateUserSchema } from '../schema/user.schema'
import { createUser, findUserCreatedByEmail } from '../service/user.service'

export const postUser = async (req: Request<unknown, unknown, CreateUserSchema>, res: Response): Promise<void> => {
  try {
    const { email } = req.body
    const findUser = await findUserCreatedByEmail(email)
    if (findUser !== null) {
      res.status(400).json({ message: 'El usuario ya existe' })
      return
    }
    await createUser(req.body)
    res.status(200).json({ message: 'Usuario creado' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
