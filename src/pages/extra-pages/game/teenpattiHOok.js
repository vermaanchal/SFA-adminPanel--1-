
import { baseURLProd } from "api/api";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

const TeenPattiHook = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [selectgame,setSelectGame] =useState("")

    const fetchData = async () => {
        try {
          let req = await fetch(`${baseURLProd}Teenpatti_gameUserDetails`, {
            method: "GET",
            'Content-Type': 'application/json',
    
          })
          const res = await req.json();
          setData(res.teenpattigameList);
          setFilter(res.teenpattigameList)
    
        }
        catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);

      useEffect(() => {
        const result = data.filter((item) => {
          return item.userId.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFilter(result)
      }, [search])

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
              // //---------------game enable disable button -------------//
  const handleGameBtn = async () => {

    try {
     await fetch(`${baseURLProd}Teenpatti_Visibility`, {
        method: 'POST',
        body: JSON.stringify({ gameStatus: selectgame }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(selectgame == '1'){
        toast.success("Game Enabled Succesfully")
      }
      else{
        toast.warning("Game disabled Succesfully")
        setTimeout(() => {
          setSelectGame("")
        }, 3000);
      }
      // fetchData();
    }
    catch (error) {
      console.error('error', error);
    }
  }
  return {
    filter, search, setSearch,downloadCSV,selectgame,setSelectGame,handleGameBtn
  }
}

export default TeenPattiHook
