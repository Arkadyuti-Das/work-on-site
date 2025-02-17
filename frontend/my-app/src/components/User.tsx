import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserProfile from "./UserProfile";

export default function User() {
  const [loginName, setLoginName]=useState<string>("");
  const navigate=useNavigate();
  useEffect(()=>{
    async function getInfo(){
      try{
        const item=localStorage.getItem("token");
        const res=await axios.post("http://localhost:3000/api/verify-token", {item});
        setLoginName(res.data.username);
        toast.success(`Welcome ${res.data.username}`);
      }
      catch(error:any){
        const {data}=error.response;
        toast.error(data.message);
        navigate("/");
      }
    }
    getInfo();
  },[])
  return (
    <div>
      <div>
        <UserProfile loggedIn={loginName}/>
      </div>
    </div>
  )
}
