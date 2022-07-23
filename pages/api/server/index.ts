import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createServer, alterUsersToServer, listServers } from '../../../src/api/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
      switch (req.method) {
         case 'POST':
            const { privateKey, serverName, hostname, username } = req.body

         let server = await createServer(serverName, privateKey, username, hostname)

         return res.json(server)
         case 'PATCH':
            const { serverId, addUserIds, delUserIds } = req.body

         let alteredUsersToServers = await alterUsersToServer(serverId, addUserIds, delUserIds)

         return res.json(alteredUsersToServers)
         case 'GET':
            let serverList = await listServers()
         return res.json(serverList)
         default:
            return res.status(404).end()
      }
   } catch (err) {
      console.error(err)
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
         if (err.code === 'P2002') {
            return res.status(402).json({ msg: `Unique constraint violation for field ${err.meta.target[0]}` })
         }
         return res.status(402).json(err)
      } else {
         return res.status(500).end()
      }

   }
}

