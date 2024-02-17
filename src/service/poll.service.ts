import { Poll } from '@prisma/client'
import prisma from '../helpers/prismaConfig'

interface IPollCreate {
  title: string
  description: string
  userId: number
}
export const createPoll = async (poll: IPollCreate): Promise<Poll | null> => {
  try {
    return await prisma.poll.create({
      data: poll
    })
  } catch (error) {
    return null
  }
}

export const findAllPollsByUser = async (id: number): Promise< Poll[] | null> => {
  try {
    return await prisma.poll.findMany({
      where: {
        userId: id
      }
    })
  } catch (error) {
    return null
  }
}

export const findPollById = async (id: number): Promise<Poll | null> => {
  try {
    return await prisma.poll.findUnique({
      where: {
        id
      },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    })
  } catch (error) {
    return null
  }
}
