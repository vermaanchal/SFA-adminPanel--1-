
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const FeedbackReportHook = () => {
    const [data,setData] =useState([]);

    const fetchData= async()=>{
        const req= await fetch(`${baseURLProd}GetReport_Feedback_Details`,{
            method:"GET",
            'Content-type':"application/json"
        })
        const res =await req.json()
        setData(res.reportFeedbackList)
    }
    useEffect(()=>{
        fetchData()
    },[])

  return {
    data
  }
}

export default FeedbackReportHook
