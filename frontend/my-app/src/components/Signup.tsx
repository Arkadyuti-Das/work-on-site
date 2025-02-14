import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
    const navigate=useNavigate();
    const [data, setData]=useState({
        username: "",
        userPassword: "",
        useremail: ""
    });

    const handleValueChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=event.target;
        setData({...data, [name]:value});
    }

    const handleSubmit=async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setData({
            username: "",
            userPassword: "",
            useremail: ""
        });
        const formElement=event.currentTarget;
        const formData=new FormData(formElement);
        const username=formData.get("username");
        const password=formData.get("userPassword");
        const email=formData.get("useremail");
        try{
            const checkOkay=await axios.post("http://localhost:3000/api/signup", {username, password, email});
            toast.success(checkOkay.data.message);
            if (checkOkay.status===200){
                const response=await axios.post("http://localhost:3000/api/login", {username, password});
                localStorage.setItem("token", response.data.token);
                navigate("/user");
            }
            else{
                alert(checkOkay.data.message);
            }
        }
        catch(error:any){
            const {data}=error.response;
            // console.log(data.message);
            toast.error(data.message);
        }
    }
  return (
    <div>
    <p>Sign up</p>
      <form onSubmit={handleSubmit} id="userform">
        <p>Enter username</p>
        <input type="text" placeholder='Enter Username' id="username" name="username" value={data.username} onChange={handleValueChange} />
        <p>Enter Password</p>
        <input type="password" name="userPassword" id="userPassword" value={data.userPassword} onChange={handleValueChange} />
        <p>Enter Email</p>
        <input type="email" name="useremail" id="useremail" value={data.useremail} onChange={handleValueChange} />
        <br />
        <button type='submit'>Submit</button>
      </form>
      <p>Existing User? <Link to={"/"}>Login</Link></p>
    </div>
  )
}
