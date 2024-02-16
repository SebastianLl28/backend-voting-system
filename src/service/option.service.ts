import { Option } from '@prisma/client'
import prisma from '../helpers/prismaConfig'

export const createOption = async (description: string, questionId: number): Promise<Option | null > => {
  try {
    return await prisma.option.create({
      data: {
        description,
        questionId
      }
    })
  } catch (error) {
    return null
  }
}
