
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const FruitSlotHook = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [selectgame,setSelectGame] =useState("")

    const fetchData = async () => {
        try {
          let req = await fetch(`${baseURLProd}Fruitslot_game_UserDetails`, {
            method: "GET",
            'Content-Type': 'application/json',
    
          })
          const res = await req.json();
          setData(res.fruitslotgameList);
          setFilter(res.fruitslotgameList)
    
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
        link.setAttribute("download", "fruitslot.csv");
        document.body.appendChild(link);
        link.click();
      };
        // //---------------game enable disable button -------------//
  const handleGameBtn = async () => {

    try {
      if(selectgame !== ""){
     await fetch(`${baseURLProd}Fruitslot_Visibility`, {
        method: 'POST',
        body: JSON.stringify({ gameStatus: selectgame }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(selectgame == '1'){
        toast.success("Game Enabled Succesfully")
        setSelectGame("")
      }
      else if(selectgame == '0'){
        toast.warning("Game disabled Succesfully")
          setSelectGame("")
      }
    }
    else{
      window.alert("please select to proceed further")
     }
  }
    catch (error) {
      console.error('error', error);
    }
  }
  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };
  return {
    filter, search, setSearch,downloadCSV,selectgame,setSelectGame,handleGameBtn,
    handleReset,data
  }
}

export default FruitSlotHook
