import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface IUser {
  id: number
  email: string
  name: string
}

interface IToken extends IUser {
  iat: number
  exp: number
}

export const generateToken = (user: IUser): string => jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '8h' })

export const verifyToken = (token: string): IToken => jwt.verify(token, process.env.JWT_SECRET as string) as IToken
