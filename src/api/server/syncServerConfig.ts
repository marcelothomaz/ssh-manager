import { PrismaClient, User, Server } from "@prisma/client";
import { NodeSSH } from "node-ssh"

const prisma = new PrismaClient()

async function syncServerConfig(serverIds: Server["id"][]): Promise<boolean> {

  serverIds.forEach(async serverId => {
    let server = await prisma.server.findUnique({ where: { id: serverId } })

    if (!server)
      throw new Error(`Server id ${serverId} not found!`)

    let users: User[] = await prisma.user.findMany({
      where: {
        servers: {
          some: {
            serverId
          }
        }
      },
    })

    if (!users)
      throw new Error(`Server with id ${serverId} not found!`)

    let newAuthorizedKeys = users.map(user => (`${user.publicKey.split(' ').slice(0,2).join(' ')} SSH-Manager-${user.username}\n`)).join('')

    const ssh = new NodeSSH()

    await ssh.connect({
      host: server.hostname,
      username: server.username,
      privateKey: server.privateKey
    })

    // clears any entry managed by SSH Manager
    await ssh.execCommand("grep -v 'SSH-Manager' $HOME/.ssh/authorized_keys > /tmp/ssh-manager-old-keys")
    // creates a temporary authorized_keys
    await ssh.execCommand(`echo "${newAuthorizedKeys}" >> /tmp/ssh-manager-old-keys`)
    // promote it to production
    await ssh.execCommand(`mv /tmp/ssh-manager-old-keys $HOME/.ssh/authorized_keys`)
  })

  return Promise.resolve(true)
}

export default syncServerConfig
