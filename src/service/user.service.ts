import { User } from '@prisma/client'
import prisma from '../helpers/prismaConfig'
import { CreateUserSchema } from '../schema/user.schema'

export const createUser = async (user: CreateUserSchema): Promise<Boolean> => {
  try {
    await prisma.user.create({ data: user })
    return true
  } catch (error) {
    return false
  }
}

export const findUserCreatedByEmail = async (email: string): Promise<User | null > => {
  try {
    // find user with state ACTIVE or INACTIVE
    return await prisma.user.findFirst({ where: { email, OR: [{ state: 'ACTIVE' }, { state: 'INACTIVE' }] } })
  } catch (error) {
    return null
  }
}

export const findUserById = async (id: number): Promise<User | null > => {
  try {
    return await prisma.user.findFirst({ where: { id } })
  } catch (error) {
    return null
  }
}
