import { baseURLProd } from 'api/api';
import{ useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const StatusHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);

  const fetchData = async () => {
      try {
          let req = await fetch(`${baseURLProd}IDBanUnBanUserDetails`, {
              method: "GET",
              'Content-Type': 'application/json',
      
          })
          const res = await req.json();
          setData(res.appUserIDBanUnbanList);
          setFilter(res.appUserIDBanUnbanList)
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

const handleApprove = async ({agencyCode,userId}) => {
  try {
    await fetch(`${baseURLProd}HostRequestApprove`, {
      method: 'POST',
      body: JSON.stringify({ agencyCode: agencyCode, userId:userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rowIndex = data.findIndex(item => item.agencyCode === agencyCode);
    if (rowIndex !== -1) {
      const updatedData = [...data];
      updatedData[rowIndex].status = 'Approved';
      toast.success("Request Approved successfully")
      setData(updatedData);
      setFilter(updatedData)
    }
  } catch (error) {
    console.error('Error approving request:', error);
  }
};

const handleReject = async ({agencyCode,userId}) => {
  try {
    await fetch(`${baseURLProd}HostRequestReject`, {
      method: 'POST',
      body: JSON.stringify({ agencyCode:agencyCode, userId:userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rowIndex = data.findIndex(item => item.agencyCode === agencyCode);
    if (rowIndex !== -1) {
      const updatedData = [...data];
      updatedData[rowIndex].status = 'Reject';
      toast.success("Request Rejected successfully")
      setData(updatedData);
      setFilter(updatedData)
    }
  } catch (error) {
    console.error('Error rejecting request:', error);
  }
};
const handleClosePreview = () => {
  setOpenPreview(false);
};
const handlePopup = (userId) => {
  console.log(userId)
  setOpenPreview(true);
};

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
    filter,search,setSearch,handleApprove,handlePopup,
    handleReject,downloadCSV,openPreview,handleClosePreview
}
}

export default StatusHook

