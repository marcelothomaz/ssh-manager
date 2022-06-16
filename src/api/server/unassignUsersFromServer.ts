
import { PrismaClient, User, Server } from "@prisma/client";

const prisma = new PrismaClient()

async function unassignUsersFromServer(serverId: Server["id"], userIds: User["id"][]): Promise<Server> {

  const connectData = userIds.map(id => ({ userId: id }))
  console.log(JSON.stringify(connectData, null, 2))

  return prisma.usersOnServers.deleteMany({
    where: {
      AND: [
        { serverId: serverId },
        {
          userId: {
            in: userIds
          }
        }
      ]

    }
  })
}

export default unassignUsersFromServer
