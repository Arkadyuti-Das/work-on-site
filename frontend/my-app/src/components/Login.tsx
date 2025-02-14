import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {

  const navigate=useNavigate();
    const [data, setData]=useState({
        username: "",
        userPassword: ""
    });

    const handleValueChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=event.target;
        setData({...data, [name]:value});
    }

    const handleSubmit=async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setData({
            username: "",
            userPassword: ""
        });
        const formElement=event.currentTarget;
        const formData=new FormData(formElement);
        const username=formData.get("username");
        const password=formData.get("userPassword");
        try{
          const response=await axios.post("http://localhost:3000/api/login", {username, password});
          localStorage.setItem("token", response.data.token);
          // console.log(response.data.data);
          if (response.data.role==="ADMIN"){
            toast.success("Welcome Admin");
            navigate("/admin");
          }
          else if (response.data.role==="USER"){
            toast.success("Welcome User");
            navigate("/user");
          }
          else{
            navigate("/");
          }
      }
      catch(error: any){
        const {data}=error.response;
          // console.log(data.message);
          toast.error(data.message);
      }
    }
  return (
    <div>
    <p>Login</p>
      <form onSubmit={handleSubmit} id="userform">
        <p>Enter username</p>
        <input type="text" placeholder='Enter Username' id="username" name="username" value={data.username} onChange={handleValueChange} />
        <p>Enter Password</p>
        <input type="password" name="userPassword" id="userPassword" value={data.userPassword} onChange={handleValueChange} />
        <br />
        <button type='submit'>Submit</button>
      </form>
      <p>New User? <Link to={"/sign-up"}>Sign-up</Link></p>
      <Link to={"/forgot-password"}>Forgot Password?</Link>
    </div>
  )
}
