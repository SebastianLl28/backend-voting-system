import { z } from 'zod'

export const createPollSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    questions: z.array(z.object({
      title: z.string(),
      options: z.array(z.object({
        description: z.string()
      }))
    }))
  })
})
export type CreatePollSchema = z.infer<typeof createPollSchema>['body']

export const getPollByIdSchema = z.object({
  params: z.object({
    id: z.string()
  })
})
export type GetPollByIdSchema = z.infer<typeof getPollByIdSchema>['params']

export const resolvePollSchema = z.object({
  body: z.object({
    options: z.array(z.object({
      id: z.number()
    }))
  }),
  params: z.object({
    id: z.string()
  })
})
export type ResolvePollSchema = z.infer<typeof resolvePollSchema>['body']
export type ResolvePollSchemaParams = z.infer<typeof resolvePollSchema>['params']
