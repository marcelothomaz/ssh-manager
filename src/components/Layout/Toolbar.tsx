import Link from 'next/link'

import { ViewGridAddIcon } from '@heroicons/react/solid'

const Toolbar: React.FC = () => {
  return (
    <div className="w-full  bg-indigo-600 h-20 mx-auto flex justify-center">
      <Link href="/server/create">
      <button className="inline-flex items-center self-center my-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-800 text-white text-sm font-medium rounded-md transition delay-50 ease-in shadow-md">
        <ViewGridAddIcon className="h-5 w-5 mr-2"/>
        <span>Add Server</span>
      </button>
      </Link>
    </div >
  )
}

export default Toolbar
