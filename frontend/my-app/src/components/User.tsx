import { useEffect } from "react";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function User() {
  const navigate=useNavigate();
  useEffect(()=>{
    async function getInfo(){
      const item=localStorage.getItem("token");
      if (item===null){
        navigate("/");
      }
      else{
        const res=await axios.post("http://localhost:3000/api/verify-token", {item});
        if (res.status!==200){
          navigate("/");
        }
      }
    }
    getInfo();
  },[])
  return (
    <div>
      <p>Welcome User</p>
      <Link to={"/reset-password"}>Update Password</Link>
      <Logout/>
    </div>
  )
}
