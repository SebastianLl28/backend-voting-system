// jwt Validator
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/jwt'
import { findUserById } from '../service/user.service'

export const jwtValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorizationHeader = req.header('Authorization') as string
    if (authorizationHeader === null) {
      res.status(401).json({ message: 'No hay token en la petición' })
      return
    }

    if (!authorizationHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'token invalido' })
      return
    }

    const token = authorizationHeader.replace('Bearer ', '').trim()

    const { id } = verifyToken(token)
    const findUser = await findUserById(id)
    if (findUser === null) {
      res.status(401).json({ message: 'token invalido' })
      return
    }
    req.body.user = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email
    }
    next()
  } catch (error) {
    res.status(401).json({
      message: 'token invalido'
    })
  }
}
