import { Server } from '@prisma/client'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'

const CreateServerForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Server>()

  const newServerMutation = useMutation(newServer => {
    console.log(newServer)
    return axios.post(`/api/server`, newServer)
  })

  const onSubmit = (data) => {
    return newServerMutation.mutate(data)
  }

  return (
    <div className="mx-auto py-12 divide-y w-full max-w-md px-2">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
        <div className="block">
          <label className="text-gray-700">Server Name</label>
          <input type="text" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " {...register("serverName", { required: true })} />
        </div>        <div className="block">
          <label className="text-gray-700">Hostname</label>
          <input type="text" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "  {...register("hostname", { required: true })} />
        </div>        <div className="block">
          <label className="text-gray-700">Access User</label>
          <input type="text" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "  {...register("username", { required: true })} />
        </div>
        <div className="block">
          <label className="text-gray-700">Private Key</label>
          <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" {...register("privateKey", { required: true })} />
        </div>
        <button type="submit" className="transition hover:delay-100 block w-full text-sm text-gray-700 bg-indigo-200 hover:bg-indigo-400 w- p-2 rounded-xl">Submit</button>
      </form>
    </div>
  )
}

export default CreateServerForm
