
import { PrismaClient, User, Server } from "@prisma/client";

const prisma = new PrismaClient()

async function alterUsersToServer(serverId: Server["id"], addUserIds: User["id"][], delUserIds: User["id"][]): Promise<Server> {

  const addUserList = addUserIds.map(id => ({ userId: id }))
  const delUserList = delUserIds.map(id => ({ userId: id }))

  return prisma.server.update({
    where: {
      id: serverId
    },
    data: {
      users: {
        create: addUserList,
        deleteMany: delUserList
      }
    }
  })
}

export default alterUsersToServer
