import { Link, Navigate, Outlet } from "react-router-dom"
import { userAuthStore } from "../store"

const Dashboard = () => {
    const {user} =userAuthStore()
    if(user === null){
        return <Navigate to='/auth/login' replace={true}/>
    }
  return (
    <div>
        <Link to='/auth/login'>Log In</Link>
        <h1>Here it will be injected, outlet is like children</h1>
        <Outlet/>
    </div>
  )
}

export default Dashboard