import type { NextPage } from 'next'
import type { NextApiRequest } from 'next'
import axios from 'axios'
import { Server } from '@prisma/client'
import { useQuery } from 'react-query'
import UserTable from '../../../src/components/UserTable'

const getUsersOnServers = async (serverId: Server["id"]) => {
  let usersOnServerList = await axios.get(`/api/server/view/${serverId}`)
  return usersOnServerList
}

const viewServerIdPage: NextPage = ({ serverId }: { serverId: Server["id"] }) => {
  const { isLoading, isError, data, error } = useQuery(
    ['getUsersOnServers', serverId],
    () => getUsersOnServers(serverId),
  )

  if (isLoading) return (<p>Loading...</p>)
  if (isError) {
    console.log(error)
    return (<p>Error...</p>)
  }

  let users = data.data.map(user => ({ ...user, checked: user.servers.some(item => item.server.id === 1) }))

  return (
    <UserTable users={users} />
  )
}

// This gets called on every request
export async function getServerSideProps(req: NextApiRequest) {
  // Fetch data from external API
  let { serverId } = req.query

  // Pass data to the page via props
  return { props: { serverId } }
}

export default viewServerIdPage
