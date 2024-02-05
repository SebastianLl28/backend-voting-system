import { Request, Response } from 'express'

export const postLogin = (_req: Request, res: Response): void => {
  try {
    res.status(200).send({
      message: 'Login Successful'
    })
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}
