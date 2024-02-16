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
