import { Request, Response } from 'express'
import { CreateUserSchema } from '../schema/user.schema'
import { createUser } from '../service/user.service'

export const postUser = async (req: Request<unknown, unknown, CreateUserSchema>, res: Response): Promise<void> => {
  try {
    await createUser(req.body)
    res.status(200).json({ message: 'Usuario creado' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
