import { User } from '@prisma/client'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const CreateUserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>()
  const router = useRouter()

  const newUserMutation = useMutation(newUser => {
    return axios.post(`/api/user`, newUser)
  },
    {
      onSuccess: () => {
        router.back()
      }
    })

  const onSubmit = (data) => {
    return newUserMutation.mutate(data)
  }

  return (
    <div className="mx-auto py-12 divide-y w-full max-w-md px-2">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
        <div className="block">
          <label className="text-gray-700">Full Name</label>
          <input type="text" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "  {...register("fullName", { required: true })} />
        </div>
        <div className="block">
          <label className="text-gray-700">User Name</label>
          <input type="text" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " {...register("username", { required: true })} />
        </div>
        <div className="block">
          <label className="text-gray-700">Password</label>
          <input type="text" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "  {...register("password", { required: true })} />
        </div>
        <div className="block">
          <label className="text-gray-700">Public Key</label>
          <input type="text" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "  {...register("publicKey", { required: true })} />
        </div>
       
        <button type="submit" className="transition hover:delay-100 block w-full text-sm text-gray-700 bg-indigo-200 hover:bg-indigo-400 w- p-2 rounded-xl">Submit</button>
      </form>
    </div>
  )
}

export default CreateUserForm
