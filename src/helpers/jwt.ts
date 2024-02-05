import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

interface IUser {
  id: number
  email: string
  name: string
}

export const generateToken = (user: IUser): string => jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '8h' })

export const verifyToken = (token: string): JwtPayload => jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
