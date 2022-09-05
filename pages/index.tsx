import type { NextPage } from 'next'
import { Server } from '@prisma/client'
import { useQuery } from 'react-query'
import Toolbar from '../src/components/Layout/Toolbar'
import ServerComponent from '../src/components/Server'
import axios from 'axios'

const getServers = async () => {
  let serverList = await axios.get<Server[]>(`/api/server`)
  return serverList
}

const Home: NextPage = () => {
  const { isLoading, isError, isSuccess, data, error } = useQuery("getServers", getServers)

  if (isLoading) return (<p>Loading...</p>)
  if (isError) {
    console.log(error)
    return (<p>Error...</p>)
  }

  return (
    <div className="content h-full w-full space-y-4">
      <Toolbar />
      <div className="space-y-2">
        {data.data.map((server, idx) => {
          return (
            <ServerComponent server={server} key={idx} />
          )
        })}
      </div>
    </div>
  )
}

export default Home
