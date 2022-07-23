import { Server } from "@prisma/client";
import { ServerIcon } from "@heroicons/react/solid";
import { UsersIcon } from "@heroicons/react/solid";
import Link from "next/link";
import moment from "moment";

interface ISyncedMessageProps {
  lastSync: Server["lastSync"] | null;
}

const SyncedMessage = (lastSync: ISyncedMessageProps & moment.MomentInput) => {
  if (lastSync) {
    return <p className="text-xs text-center text-slate-500">never synced</p>;
  } else {
    return (
      <p className="text-xs text-center text-slate-500">
        synced<br />
        {moment(lastSync).fromNow()}
      </p>
    );
  }
};

const Server = ({ server }: { server: Server }): JSX.Element => {
  return (
    <Link href={`/server/view/${server.id}`}>
      <div
        className={`p-4 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center justify-between cursor-pointer`}
      >
        <ServerIcon className="w-5 mr-5" />
        <div className="flex-1">
          <div className="text-sm font-medium text-black">
            {server.serverName}
          </div>
          <p className="text-xs text-slate-500">
            {`${server.username}@${server.hostname}`}
          </p>
        </div>
        <div className="h-full flex flex-col items-center text-slate-500 mr-5 ml-auto">
          <UsersIcon className="w-4" />
          <span className="text-sm">{server.users.length}</span>
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="green"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <SyncedMessage lastSync={server.lastSync} />
        </div>
      </div>
    </Link>
  );
};

export default Server;
