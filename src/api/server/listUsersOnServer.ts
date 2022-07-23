import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function listUsersOnServer(serverId: number) {
  return prisma.server.findUnique({
    where: {
      id: serverId,
    },
    select: {
      lastSync: true,
      users: {
        select: {
          user: {
            select: {
              fullName: true,
              username: true,
              updatedAt: true
            },
          },
        },
      },
    },
  });
}

export default listUsersOnServer;
