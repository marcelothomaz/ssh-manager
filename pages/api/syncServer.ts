import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { syncServerConfig } from '../../src/api/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const { serverIds } = req.body

        let server = await syncServerConfig(serverIds)

        return res.json(server)
      default:
        return res.status(404).end()
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(402).json({ msg: `Unique constraint violation for field ${err.meta.target[0]}` })
      }
      return res.status(402).json(err)
    } else {
      console.error(err)
      return res.status(500).end()
    }

  }
}

