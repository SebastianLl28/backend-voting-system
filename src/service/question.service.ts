import { Question } from '@prisma/client'
import prisma from '../helpers/prismaConfig'

export const createQuestion = async (description: string, pollId: number): Promise<Question | null > => {
  try {
    return await prisma.question.create({
      data: {
        description,
        pollId
      }
    })
  } catch (error) {
    return null
  }
}
