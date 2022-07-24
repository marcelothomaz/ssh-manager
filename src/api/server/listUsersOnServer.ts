import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function listUsersOnServer(serverId: number) {
  // return prisma.server.findUnique({
  //   where: {
  //     id: serverId,
  //   },
  //   select: {
  //     lastSync: true,
  //     updatedAt: true,
  //     users: {
  //       select: {
  //         user: {
  //           select: {
  //             id: true,
  //             fullName: true,
  //             username: true,
  //             updatedAt: true
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
      updatedAt: true,
      servers: {
        select: {
          server: {
            select: {
              id: true,
              lastSync: true,
            }
          }
        }
      }
    }
  })
}

export default listUsersOnServer;
