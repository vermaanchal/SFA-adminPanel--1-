
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const AudioStreamingHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [message,setmessage]=useState("")

    const fetchData= async()=>{
        const req= await fetch(`${baseURLProd}AudioStreamingDetails`,{
            method:"GET",
            'Content-type':"application/json"
        })
        const res =await req.json()
        if(res.status == true){
        setData(res.audioStreamingList)
        setFilter(res.audioStreamingList)
        }
        else{
          setmessage("No data is available")
      }
      
    }
    useEffect(()=>{
        fetchData()
    },[])
 //------------------------serach by userid-----------//

 useEffect(() => {
  const result = data.filter((item) => {
    return item.userId.toLowerCase().match(search.toLocaleLowerCase())
  })
  setFilter(result)
}, [search])

 // ----------------CSV file download---------------------//

 const downloadCSV = () => {
  // Format the data for CSV
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [
      Object.keys(filter[0]).join(','), // Header row
      ...filter.map((row) => Object.values(row).join(',')), // Data rows
    ].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
};
const handleViewToday = async (userId) => {
  window.location.href = `/useraudiostreaming/${userId}`;
};

const handleViewMonthly = async (userId) => {
  window.location.href = `/audiomonthlyreport/${userId}`;
};
  return {
    filter, search, setSearch,downloadCSV,handleViewToday,handleViewMonthly,message
  }
}

export default AudioStreamingHook
