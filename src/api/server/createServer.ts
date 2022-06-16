import { PrismaClient, Server } from '@prisma/client'

const prisma = new PrismaClient()

async function createServer(serverName: Server["serverName"], privateKey: Server["privateKey"], username: Server["username"], hostname: Server["hostname"]): Promise<Server> {
  return prisma.server.create({
    data: {
      serverName,
      privateKey,
      hostname,
      username
    }
  })
}

export default createServer
