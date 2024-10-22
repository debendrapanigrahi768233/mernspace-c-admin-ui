import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { self } from '../http/api'
import { userAuthStore } from '../store'
import { useEffect } from 'react'


const getSelf=async()=>{
    //server call logic
    const {data}=await self()
    return data
  }

const Root = () => {
    const {setUser} = userAuthStore()
    const {data: selfData, isLoading}=useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
    })

    
    useEffect(()=>{
        if(selfData){
            setUser(selfData)
        }
    },[selfData, setUser])


    if(isLoading){
        return <div>Loading...</div>
    }
      
  return <Outlet/>
}

export default Root