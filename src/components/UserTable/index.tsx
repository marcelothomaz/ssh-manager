import { User } from '@prisma/client'
import moment from 'moment'

type TUserProps = {
  user: User
}

const User = ({ user }: TUserProps) => {
  console.log(user)
  return (
    <tr>
      <td className="sticky left-0 p-4 bg-white">
        <input
          className="w-5 h-5 border-gray-200 rounded"
          type="checkbox"
          id="row_1"
        />
      </td>
      <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.id}</td>
      <td className="p-4 font-medium text-gray-700 whitespace-nowrap">
        {user.fullName}
      </td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{user.username}</td>
      <td className="p-4 text-gray-700 whitespace-nowrap">
        <strong
          className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-medium"
        >
          Cancelled
        </strong>
      </td>
      <td className="p-4 text-gray-700 whitespace-nowrap">{moment(user.updatedAt).format('DD-MMM-YY HH:mm')}</td>
    </tr>
  )
}

type TUserTableProps = {
  users: User[]
}

const UserTable = (props: TUserTableProps) => {
  let users = props.users

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="sticky left-0 p-4 text-left bg-white">
              <label className="sr-only" htmlFor="row_all">Select All</label>
              <input
                className="w-5 h-5 border-gray-200 rounded"
                type="checkbox"
                id="row_all"
              />
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                ID
              </div>
            </th>

            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                Name
              </div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                Username
              </div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                Status
              </div>
            </th>
            <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
              <div className="flex items-center">
                Last Updated
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
