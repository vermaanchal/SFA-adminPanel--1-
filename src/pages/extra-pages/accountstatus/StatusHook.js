import { baseURLProd } from 'api/api';
import{ useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const StatusHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [idBanUserid,setIdbanUserid] =useState("")
  const [idBanReason,setIdBanReason] =useState("")
const [validationMessage, setValidationMessage] = useState('');

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

  //---------------filter data on search-------------//
  useEffect(() => {
    const result = data.filter((item) => {
        return item.userId.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
}, [search])

const handleInputChange = (e) => {
  setIdBanReason(e.target.value);
  if (e.target.value.trim() !== '') {
    setValidationMessage('');
  }
};
//-----------request Approve ---------------//
const handleIdBan = async () => {
  try {
    if (window.confirm("Are you sure to Ban this Id ?")) {
    await fetch(`${baseURLProd}IdBan`, {
      method: 'POST',
      body: JSON.stringify({ userID: idBanUserid, idBanReason:idBanReason }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rowIndex = data.findIndex(item => item.userId === idBanUserid);
    if (rowIndex !== -1) {
      const updatedData = [...data];
      updatedData[rowIndex].status = 'False';
      toast.success("Id Banned successfully")
      setData(updatedData);
      setFilter(updatedData)
      fetchData();
      handleClosePreview()
    }
  }
  } catch (error) {
    console.error('Error approving request:', error);
  }
};
const handleBanClick = () => {
  if (idBanReason.trim() === '') {
    setValidationMessage('Please enter the IdBan reason !');
  } else {
    handleIdBan();
  }
};
// -----------------request Reject--------------//
const handleIdUnban = async (userId) => {
  try {
    if (window.confirm("Are you sure to Unban this Id?")) {
    await fetch(`${baseURLProd}IdUnBan`, {
      method: 'POST',
      body: JSON.stringify({ userID:userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rowIndex = data.findIndex(item => item.userId === userId);
    if (rowIndex !== -1) {
      const updatedData = [...data];
      updatedData[rowIndex].status = 'True';
      toast.success("Id UnBanned successfully")
      setData(updatedData);
      setFilter(updatedData)
      fetchData();
    }
  }
  } catch (error) {
    console.error('Error rejecting request:', error);
  }
};
const handleClosePreview = () => {
  setIdBanReason("")
  setOpenPreview(false);
};
const handlePopup = (userId) => {
  setIdbanUserid(userId)
  setOpenPreview(true);
};
//----------download csv---------------------//
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
  link.setAttribute("download", "Id_banUnban.csv");
  document.body.appendChild(link);
  link.click();
};
const handleReset = () => {
  setSearch('');
  setFilter(data);
};
  return {
    filter,search,setSearch,handleIdBan,handlePopup,handleBanClick,handleInputChange,validationMessage,
    handleIdUnban,downloadCSV,openPreview,handleClosePreview,idBanReason,setIdBanReason,handleReset,data
}
}

export default StatusHook

