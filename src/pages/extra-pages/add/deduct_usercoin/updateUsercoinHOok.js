
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";


const UpdateUsercoinHook = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])

    const fetchData = async () => {
        try {
          let req = await fetch(`${baseURLProd}Add_DeductCoinUserDetails`, {
            method: "GET",
            'Content-Type': 'application/json',
    
          })
          const res = await req.json();
          setData(res.addDeductCoinList);
          setFilter(res.addDeductCoinList)
    
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
    if (search) {
      const result = data.filter((item, index, self) =>
        index === self.findIndex(t => t.userId.toLowerCase() === item.userId.toLowerCase())
      ).filter((item) => 
        item.userId.toLowerCase().includes(search.toLowerCase())
      );

      setFilter(result);
    } else {
      setFilter(data);
    }
  }, [search, data]);

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
 const handleChange = (e, userId) => {
  const { value } = e.target;
  const newData = { ...filter };
  if (newData.userId === userId) {
    newData.amount = value;
  }
  setFilter(newData);
};

 //---------------add beans-------------//
 const handleSubmit = async () => {
  try {
    for (const row of filter) {
      if (row.userId && row.amount) {
        await fetch(`${baseURLProd}AddBean`, {
          method: 'POST',
          body: JSON.stringify({ userId: row.userId, beanAmount: row.amount }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }
    if (window.confirm("Are you sure to add beans")) {
    toast.success("Beans Added successfully");
    fetchData();
    }
  } catch (error) {
    console.error('Error adding beans coins:', error);
  }
}

 //---------------add beans-------------//
 const handleDeductCoin = async () => {
  try {
    for (const row of filter) {
      if (row.userId && row.amount) {
        await fetch(`${baseURLProd}DeductBean`, {
          method: 'POST',
          body: JSON.stringify({ userId: row.userId, beanAmount: row.amount }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }
    if (window.confirm("Are you sure to deduct beans")) {
    toast.success("Beans deducted successfully");
    fetchData();
    }
  } catch (error) {
    console.error('Error adding beans coins:', error);
  }
}
  return {
    filter, search, setSearch,downloadCSV,handleChange,handleSubmit,handleDeductCoin
  }
}

export default UpdateUsercoinHook
