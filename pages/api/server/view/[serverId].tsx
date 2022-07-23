import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { listUsersOnServer } from '../../../../src/api/server'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const { serverId } = req.query
        if (!serverId) {
          return res.status(402).end()
        }

        let usersOnServer = await listUsersOnServer(+serverId)
        return res.json(usersOnServer)
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

