import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const BankDetailHook = () => {
    const [data,setData] =useState([]);

    const fetchData= async()=>{
        const req= await fetch(`${baseURLProd}GetBankWithdrawDetails`,{
            method:"GET",
            'Content-type':"application/json"
        })
        const res =await req.json()
        setData(res.bankWithdrawUserList)
    }
    useEffect(()=>{
        fetchData()
    },[])

  return {
    data
  }
}

export default BankDetailHook
