import prisma from '../helpers/prismaConfig'
import { CreateUserSchema } from '../schema/user.schema'

export const createUser = async (user: CreateUserSchema): Promise<Boolean> => {
  try {
    await prisma.user.create({ data: user })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
