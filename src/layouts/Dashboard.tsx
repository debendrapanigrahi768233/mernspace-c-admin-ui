import { Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <div>
        <h1>Here it will be injected, outlet is like children</h1>
        <Outlet/>
    </div>
  )
}

export default Dashboard