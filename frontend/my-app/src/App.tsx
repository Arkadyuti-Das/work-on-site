import { Routes, Route } from 'react-router-dom'
import Admin from './components/Admin'
import User from './components/User'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/sign-up' element={<Signup/>} />
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </>
  )
}
