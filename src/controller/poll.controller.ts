import { Request, Response } from 'express'
import { RequestUser } from '../interface/Request'
import { CreatePollSchema } from '../schema/poll.schema'
import { createPoll, findAllPollsByUser } from '../service/poll.service'
import { createQuestion } from '../service/question.service'
import { createOption } from '../service/option.service'

interface PostPollBody extends RequestUser, CreatePollSchema {}
export const postPoll = async (req: Request<unknown, unknown, PostPollBody>, res: Response): Promise<void> => {
  try {
    const poll = await createPoll({ title: req.body.title, description: req.body.description, userId: req.body.user.id })
    if (poll === null) {
      res.status(400).json({ message: 'Error al crear encuesta' })
      return
    }

    await Promise.all(req.body.questions.map(async (question) => {
      const questionCreated = await createQuestion(question.title, poll.id)
      if (questionCreated === null) {
        throw new Error('Error al crear pregunta')
      }

      const createOptions = await Promise.all(question.options.map(async (option) => {
        await createOption(option.description, questionCreated.id)
        return true
      }))

      return {
        question: questionCreated,
        options: createOptions
      }
    }))

    res.status(200).json({ message: 'Encuesta creada correctamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al agregar usuario' })
  }
}

export const getPollsByUser = async (req: Request<unknown, unknown, RequestUser>, res: Response): Promise<void> => {
  try {
    const polls = await findAllPollsByUser(req.body.user.id)
    res.status(200).json({ polls })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al obtener encuestas' })
  }
}
