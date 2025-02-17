import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function UserProfile(props:any) {
  return (
    <>
    <div className="flex">
      <div className="w-[20dvw] h-dvh bg-slate-950">
        <div className="border-b-2 border-slate-200 rounded-full h-fit py-6 flex flex-col justify-center items-center space-y-4">
          <p className="text-slate-200 font-semibold text-xl animate-pulse">Welcome</p>
          <p className="text-lime-600 font-semibold text-xl">{props.loggedIn}</p>
          <Logout className="text-slate-200 bg-indigo-600 px-2 py-1 rounded-lg font-semibold"/>
          <button className="text-slate-200 bg-rose-600 px-2 py-1 rounded-lg font-semibold">
            <Link to={"/reset-password"}>Reset Password</Link>
          </button>
        </div>
        <div className="h-fit py-6 flex flex-col justify-center items-center">
          <p className="text-slate-400 font-semibold text-2xl">Products</p>
          {/* Include respective options */}
        </div>
      </div>
      <div className="border-2 border-lime-600 w-[80dvw] h-dvh"></div>
    </div>
    </>
  )
}
