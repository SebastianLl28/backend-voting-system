import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

const schemaValidator = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    })
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(
        error.issues.map((issue) => ({
          path: issue.path[1],
          message: issue.message
        }))
      )
    }
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default schemaValidator
