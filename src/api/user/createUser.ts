import { Prisma, PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function createUser(userData: Prisma.UserCreateInput): Promise<User> {
  return prisma.user.create({
    data: userData
  })
}

// setup middleware to hash password
prisma.$use(async (params, next) => {

  if (params.model === "User" && params.action === "create") {
    const hashedPassword = await bcrypt.hash(params.args.data.password, 10);
    params.args.data.password = hashedPassword;
  }
  const result = await next(params)

  return result
})

export default createUser
