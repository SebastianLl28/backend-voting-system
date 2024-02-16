import { Request, Response } from 'express'
import { CreateUserSchema } from '../schema/user.schema'
import { createUser, findUserCreatedByEmail, findUserById } from '../service/user.service'
import { RequestUser } from '../interface/Request'

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

export const getUser = async (req: Request<unknown, unknown, RequestUser >, res: Response): Promise<void> => {
  try {
    const user = await findUserById(req.body.user.id)
    if (user === null) {
      res.status(404).json({ message: 'Usuario no encontrado' })
      return
    }
    res.status(200).json({ ...req.body.user, lastName: user.lastName })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
