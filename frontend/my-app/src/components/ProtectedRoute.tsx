import { useEffect, useState } from "react"

export default function ProtectedRoute() {
    const [isLoggedIn, setIsLoggedIn]=useState({logged: false, loggedAs: "guest"});
    useEffect(()=>{
        //
    },[])
  return (
    <>
        <p></p>
    </>
  )
}
