
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";


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
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
      };
  return {
    filter, search, setSearch,downloadCSV,selectgame,setSelectGame
  }
}

export default FruitSlotHook
