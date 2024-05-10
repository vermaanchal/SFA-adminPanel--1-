import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ResellerHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  // const [id,setId] =useState(null)
  //---------------fetch data---------------//
  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}GetUserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.userList);
      setFilter(res.userList)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  //--------------------filter------------------//
  useEffect(() => {
    const result = data.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
  }, [search])

  //----------------download CSV file-----------------//
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

 //-------------select value--------------------
  const handleSelectChange = (e, userId) => {
    const { value } = e.target;
    const newData = filter.map(item => {
      if (item.userId === userId) {
        return { ...item, resellerTypeId: value };
      }
      return item;
    });
    setFilter(newData);
  };

  // //---------------create Reseller-------------//
  const handleSubmit = async () => {

    try {
      for (const row of filter) {
        if (row.resellerTypeId ) {
          await fetch(`${baseURLProd}CreateReseller`, {
            method: 'POST',
            body: JSON.stringify({ resellerTypeId: row.resellerTypeId, userId: row.userId }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      }
     toast.success("Reseller created Succesfully")
    }
    catch (error) {
      console.error('error', error);
    }
  }

  return {
    filter, search, setSearch, downloadCSV, setFilter, handleSubmit, handleSelectChange
  }
}

export default ResellerHook
