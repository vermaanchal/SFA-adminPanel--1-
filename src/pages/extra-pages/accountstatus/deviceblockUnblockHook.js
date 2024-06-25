import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const DeviceIdBlockUnblockHook = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')

  //---------------------fetch data---------------//

  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}GetDeviceBlockUserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.deviceBlockUserList);
      setFilter(res.deviceBlockUserList)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  //   //------------------------serach by userid-----------//
        useEffect(() => {
          const result = data.filter((item) => {
            return item.userId.toLowerCase().match(search.toLocaleLowerCase())
          })
          setFilter(result)
        }, [search])

  //---------------Block-------------------//
  const handleBlock = async ({ deviceId, userId }) => {
    try {
      if (window.confirm("Are you sure to Block this Id?")) {
      const req = await fetch(`${baseURLProd}UserDeviceIdBlock`, {
        method: 'POST',
        body: JSON.stringify({ deviceId: deviceId, userId: userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res = await req.json()
      if (res.status == true) {
          const rowIndex = data.findIndex(item => item.deviceId === deviceId && item.userId === userId);
          if (rowIndex !== -1) {
            const updatedData = [...data];
            console.log(updatedData,'updateee')

            updatedData[rowIndex].status = 'False';
            toast.success("Id blocked Successfully")
            setData(updatedData);
            setFilter(updatedData);
          }
          fetchData()
        }
        else {
          toast.error("device Id not found")
        }
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  //--------------------reject ------------------------//
  const handleUnblock = async ({ deviceId, userId }) => {
    try {
      if (window.confirm("Are you sure to Unblock this Id?")) {
      await fetch(`${baseURLProd}UserDeviceIdUnBlock`, {
        method: 'POST',
        body: JSON.stringify({ deviceId: deviceId, userId: userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
        const rowIndex = data.findIndex(item => item.deviceId === deviceId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'True';
          toast.success("ID Unblocked successfully")
          setData(updatedData);
          setFilter(updatedData)
        }
        fetchData()
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

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
    link.setAttribute("download", "deviceblockUnblock.csv");
    document.body.appendChild(link);
    link.click();
  };
  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };
  return {
    filter, handleBlock,
    handleUnblock, downloadCSV,handleReset,data,search,setSearch
  }
}

export default DeviceIdBlockUnblockHook

