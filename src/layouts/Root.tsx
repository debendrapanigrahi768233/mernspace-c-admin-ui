import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { self } from '../http/api'
import { userAuthStore } from '../store'
import { useEffect } from 'react'
import { AxiosError } from 'axios'


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
        retry: (failureCounts:number, error)=>{
            if(error instanceof AxiosError && error.response?.status === 401){
                return false
            }
            return failureCounts<3              //if 401 then dont retry else retry 3 times
        }
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