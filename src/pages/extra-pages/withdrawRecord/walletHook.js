
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const WalletWithdrawHook = () => {
    const [data,setData] =useState([]);

    const fetchData= async()=>{
        const req= await fetch(`${baseURLProd}GetWalletWithdrawDetails`,{
            method:"GET",
            'Content-type':"application/json"
        })
        const res =await req.json()
        setData(res.walletWithdrawUserList)
    }
    useEffect(()=>{
        fetchData()
    },[])

  return {
    data
  }
}

export default WalletWithdrawHook
