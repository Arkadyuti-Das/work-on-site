import { useEffect } from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
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
      <p>Welcome Admin</p>
      <Logout/>
    </div>
  )
}
