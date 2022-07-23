import { PrismaClient, Server } from "@prisma/client";

const prisma = new PrismaClient()

async function listServers(): Promise<Server[]> {
  return prisma.server.findMany({
    include: {
      users: true
    }
  })
}

export default listServers
