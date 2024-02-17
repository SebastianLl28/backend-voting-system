import { Request, Response } from 'express'
import { RequestUser } from '../interface/Request'
import { CreatePollSchema, GetPollByIdSchema, ResolvePollSchema, ResolvePollSchemaParams } from '../schema/poll.schema'
import { createPoll, findAllPollsByUser, findPollById } from '../service/poll.service'
import { createQuestion } from '../service/question.service'
import { createOption } from '../service/option.service'
import { createManyVotes } from '../service/vote.service'
import { findUserById } from '../service/user.service'

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

export const getPollById = async (req: Request<GetPollByIdSchema, unknown, RequestUser>, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (id === undefined) {
      res.status(400).json({ message: 'Error al obtener encuesta' })
      return
    }
    const poll = await findPollById(parseInt(req.params.id))
    if (poll === null) {
      res.status(404).json({ message: 'Encuesta no encontrada' })
    }
    res.status(200).json({ ...poll })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al obtener encuesta' })
  }
}

interface postPollSolveBody extends RequestUser, ResolvePollSchema {}
export const postPollSolve = async (req: Request<ResolvePollSchemaParams, unknown, postPollSolveBody>, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    if (id === undefined) {
      res.status(400).json({ message: 'Error al resolver encuesta' })
      return
    }
    const poll = await findPollById(parseInt(req.params.id))
    if (poll === null) {
      res.status(404).json({ message: 'Encuesta no encontrada' })
      return
    }
    const user = await findUserById(req.body.user.id)
    if (user === null) {
      res.status(404).json({ message: 'Usuario no encontrado' })
      return
    }
    await createManyVotes(user.id, req.body.options)
    console.log(req.body)
    res.status(200).json({ message: 'Encuesta resuelta correctamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al resolver encuesta' })
  }
}
