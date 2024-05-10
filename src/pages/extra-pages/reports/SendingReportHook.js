
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";


const SendingReportHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const fetchData = async () => {
      try {
        let req = await fetch(`${baseURLProd}TrippleSevengame_UserDetails`, {
          method: "GET",
          'Content-Type': 'application/json',
  
        })
        const res = await req.json();
        setData(res.tripleSevengameList);
        setFilter(res.tripleSevengameList)
  
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
//-----------------date picker---------------//
const handleFilter = () => {
  const filtered = data.filter(item => {
    const date = new Date(item.date);
    return date >= new Date(fromDate) && date <= new Date(toDate);
  });
  setFilter(filtered);
  
};
return {
  filter, search, setSearch,downloadCSV,handleFilter,fromDate,toDate,setFromDate,setToDate
}
}
export default SendingReportHook
