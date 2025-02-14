import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export default function ResetPassword() {
    const navigate=useNavigate();
    const [data, setData]=useState({
        entry: "",
        confirmEntry:"",
        username:"",
        currentPassword:""
    });

    useEffect(()=>{
        async function getInfo(){
            const item=localStorage.getItem("token");
            if (item===null){
              navigate("/");
            }
            else{
              const res=await axios.post("http://localhost:3000/api/verify-token", {item});
            //   console.log(res.data.username);
              if (res.status!==200){
                navigate("/");
              }
              else{
                setData((prevData)=>({...prevData, username: res.data.username}));
              }
            }
          }
          getInfo();
    },[]);

    useEffect(()=>{
        // console.log(data);
    },[data]);

    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=event.target;
        setData({...data, [name]:value});
    }

    const handleSubmit=async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formElement=event.currentTarget;
        const formData=new FormData(formElement);
        const currentPassword=formData.get("currentPassword");
        //check is current password entered is valid
        try{
          const passResponse=await axios.post("http://localhost:3000/api/check-oldpassword", {currentPassword, username:data.username});
          if (passResponse.status===200){
            const entry=formData.get("entry");
            const confirmEntry=formData.get("confirmEntry");
            if (entry!==confirmEntry){
                toast.error("New passwords don't match");
            }
            else{
                try{
                  const res=await axios.post("http://localhost:3000/api/reset-password", {password: entry, username: data.username});
                  toast.success(res.data.message);
                }
                catch(error:any){
                  const {data}=error.response;
                  toast.error(data.message);
                }
            }
          }
        }
        catch(error:any){
          const {data}=error.response;
          toast.error(data.message);
        }
        finally{
          setData({
            entry: "",
            confirmEntry:"",
            username:"",
            currentPassword:""
          });
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit} id="confirmForm">
        <p>Enter current password</p>
        <input type="password" name="currentPassword" value={data.currentPassword} onChange={handleChange} />
        <p>Enter New Password</p>
        <input type="password" name="entry" value={data.entry} onChange={handleChange} />
        <p>Confirm New Password</p>
        <input type="password" name="confirmEntry" value={data.confirmEntry} onChange={handleChange} />
        <br />
        <button type="submit">Save Changes</button>
      </form>
      <br />
      <button onClick={()=>navigate("/user")}>Go Back</button>
    </div>
  )
}
