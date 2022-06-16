import { PrismaClient, User, Server } from "@prisma/client";

const prisma = new PrismaClient()

async function assignUsersToServer(serverId: Server["id"], userIds: User["id"][]): Promise<Server> {

  const connectData = userIds.map(id => ({ userId: id }))
  console.log(JSON.stringify(connectData, null, 2))

  return prisma.server.update({
    where: {
      id: serverId
    },
    data: {
      users: {
        create: connectData
      }
    }
  })
}

export default assignUsersToServer
