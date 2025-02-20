import { Link } from "react-router-dom";
import Logout from "./Logout";
import ProductWorkspace from "./ProductWorkspace";

export default function UserProfile(props:any) {
  return (
    <>
    <div className="flex">
      <div className="w-[20dvw] h-dvh bg-slate-950">
        <div className="border-b-2 border-slate-200 rounded-full h-fit py-6 flex flex-col justify-center items-center space-y-4">
          <p className="text-slate-200 font-semibold text-xl animate-pulse">Welcome</p>
          <p className="text-lime-600 font-semibold text-xl">{props.loggedIn}</p>
          <Logout className="text-slate-200 bg-indigo-600 px-2 py-1 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-400"/>
          <button className="text-slate-200 bg-rose-600 px-2 py-1 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-400">
            <Link to={"/reset-password"}>Reset Password</Link>
          </button>
        </div>
        <div className="h-fit py-6 flex flex-col justify-center items-center space-y-6">
          <p className="text-slate-400 font-semibold text-2xl">Products</p>
          <div className="space-y-4">
            <button className="bg-slate-200 text-slate-950 font-semibold px-2 py-1 rounded-lg hover:shadow-lg hover:shadow-slate-400">Create New Product</button>
            <div>
              <form className="flex flex-col justify-center items-center space-y-4">
                <p className="text-slate-200">Products Per Page</p>
                <select name="productOptions">
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <br />
                <button type="submit" className="bg-emerald-600 px-2 py-1 rounded-lg text-slate-950 font-semibold hover:shadow-lg hover:shadow-emerald-400">Apply Filter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80dvw] h-dvh">
        {/* right div */}
        <ProductWorkspace/>
      </div>
    </div>
    </>
  )
}
