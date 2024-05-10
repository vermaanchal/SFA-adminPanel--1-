
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const EndUserStreamHook = () => {
    const [data,setData] =useState([]);
    const [message,setmessage]=useState("")
    const fetchData= async()=>{
        const req= await fetch(`${baseURLProd}GetLiveStreamingDetails`,{
            method:"GET",
            'Content-type':"application/json"
        })
        const res =await req.json()
        if(res.status == true){
        setData(res.userLiveList)
        }
        else{
            setmessage("No data is available")
        }
        
    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleAdd = async (userId) => {
        await fetch(`${baseURLProd}UserLiveEnd`, {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newData = data.filter(row => (row.userid !== userId));
        setData(newData);
        fetchData();
        toast.success("Live Ended successfully")
    }
  return {
    data,handleAdd,message
  }
}

export default EndUserStreamHook
