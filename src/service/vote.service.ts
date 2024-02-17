import prisma from '../helpers/prismaConfig'

interface option {
  id: number
}
export const createManyVotes = async (userId: number, options: option[]): Promise<boolean> => {
  try {
    await prisma.vote.createMany({
      data: options.map(option => ({
        userId,
        optionId: option.id
      }))
    })
    return true
  } catch (error) {
    return false
  }
}
