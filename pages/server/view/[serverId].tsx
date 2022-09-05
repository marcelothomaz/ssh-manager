import type { NextPage } from 'next'
import type { NextApiRequest } from 'next'
import axios from 'axios'
import { Server, User } from '@prisma/client'
import { useQuery, useMutation } from 'react-query'
import UserTable from '../../../src/components/UserTable'
import ServerToolbar from '../../../src/components/Server/ServerToolbar'

const getUsersOnServers = async (serverId: Server["id"]) => {
  let usersOnServerList = await axios.get(`/api/server/view/${serverId}`)
  return usersOnServerList
}

const viewServerIdPage: NextPage = ({ serverId }: { serverId: Server["id"] }) => {
  const { isLoading, isError, data, error } = useQuery(
    ['getUsersOnServers', serverId],
    () => getUsersOnServers(serverId),
  )

  const mutateUsersOnServer = useMutation(({ addUserIds, delUserIds }: { addUserIds: User["id"][], delUserIds: User["id"][] }) => {
    return axios.patch(`/api/server`, { addUserIds, delUserIds, serverId: parseInt(serverId) })
  })

  if (mutateUsersOnServer.isLoading) return (<p>loading...</p>)
  if (mutateUsersOnServer.isError) {
    console.log(error)
    return (<p>error...</p>)
  }
  if (isLoading) return (<p>loading...</p>)
  if (isError) {
    console.log(error)
    return (<p>error...</p>)
  }

  let users = data.data.map(user => ({ ...user, checked: user.servers.some(item => item.server.id == serverId) }))

  const handleServerSync = () => {
    let userList = document.querySelectorAll('#user-table-selector input[type="checkbox"]')
    let selectedUsers = Array.prototype.filter.call(userList, user => (user.checked)).map(user => parseInt(user.id))
    let currentUsersOnServer = users.filter(user => user.checked).map(user => parseInt(user.id))

    let delUserIds = currentUsersOnServer.filter(userId => !selectedUsers.includes(userId))
    let addUserIds = selectedUsers.filter(userId => !currentUsersOnServer.includes(userId))

    return mutateUsersOnServer.mutate({ addUserIds, delUserIds })
  }

  return (
    <>
      <ServerToolbar onServerSync={handleServerSync} />
      <UserTable users={users} id="user-table-selector" />
    </>
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
