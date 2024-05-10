import { baseURLProd } from 'api/api';
import{ useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AgencyRequestHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [userName, setUserName] = useState('');
  const [agencyLocation, setAgencyLocation] = useState('');
  const [agencyContact, setAgencyContact] = useState('');
  const [agencyEmail, setAgencyEmail] = useState('');
  const [hostYouHave, setHostYouHave] = useState('');
  const [adminId, setAdminId] = useState('');
  const [agencyCode, setAgencyCode] = useState('');

  const fetchData = async () => {
      try {
          let req = await fetch(`${baseURLProd}AgencyRequest`, {
              method: "GET",
              'Content-Type': 'application/json',
      
          })
          const res = await req.json();
          setData(res.agencyRequestList);
          setFilter(res.agencyRequestList)
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

const handleApprove = async (agencyCode,userId) => {
  try {
    await fetch(`${baseURLProd}AgencyRequestApprove`, {
      method: 'POST',
      body: JSON.stringify({ AgencyCode: agencyCode, userId:userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rowIndex = data.findIndex(item => item.userId === userId && item.agencyCode === agencyCode);
    if (rowIndex !== -1) {
      const updatedData = [...data];
      updatedData[rowIndex].status = 'Approve';
      toast.success("Request Approved successfully")
      setData(updatedData);
      setFilter(updatedData)
    }
  } catch (error) {
    console.error('Error approving request:', error);
  }
};

const handleReject = async (agencyCode,userId) => {
  try {
    await fetch(`${baseURLProd}AgencyRequestReject`, {
      method: 'POST',
      body: JSON.stringify({ AgencyCode:agencyCode, userId:userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const rowIndex = data.findIndex(item => item.userId === userId);
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

const handleDownload = (imageUrl, imageName) => {
fetch(imageUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  })
  .then(blob => {
    const link = document.createElement('a');
    const objectURL = URL.createObjectURL(blob);
    link.href = objectURL;
    link.download = imageName;
    link.click();
    URL.revokeObjectURL(objectURL);
  })
  .catch(error => {
    console.error('Error fetching image:', error);
  });
}

const handleImageClick = (imageUrl) => {
  setPreviewImageUrl(imageUrl);
  setOpenPreview(true);
};

const handleClosePreview = () => {
  setOpenPreview(false);
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

//----------------get user detail---------------//
const handleEdit = async (userId,agencyName, userName, agencyLocation, agencyContact, agencyEmail, hostYouHave,adminId,agencyCode) => {
  setOpen(true);
  setUserId(userId)
  setAgencyName(agencyName)
  setUserName(userName)
  setAgencyLocation(agencyLocation)
  setAgencyContact(agencyContact)
  setAgencyEmail(agencyEmail)
  setHostYouHave(hostYouHave)
  setAdminId(adminId)
  setAgencyCode(agencyCode)

}
//-----------------------edit user detail ------------------//
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch(`${baseURLProd}UserEditDetails`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userId: userId,
              agencyName: agencyName,
              userName:agencyName,
              agencyLocation:agencyLocation,
              agencyContact:agencyContact,
              agencyEmail:agencyEmail,
              hostYouHave:hostYouHave,
              agencyCode:agencyCode,
              adminId:adminId
          }),
      });

      if (!response.ok) {
          throw new Error('Failed to edit user details');
      }

      await response.json();
      fetchData()
      setOpen(false);
      setUserId("")
      setAgencyName("")
      setUserName("")
      setAgencyLocation("")
      setAgencyContact("")
      setAgencyEmail("")
      setHostYouHave("")
      setAgencyCode("")
      setAdminId("")

      toast.success("user details changed ")
  } catch (error) {
      console.log(error.message);
  }
};
const handleClose = () => {
setOpen(false)
}
  return {
    filter, search,  setSearch,openPreview, setOpenPreview,previewImageUrl, setPreviewImageUrl,
        handleClosePreview, handleDownload, handleImageClick,handleApprove,
        handleReject,downloadCSV,handleEdit,handleSubmit,userId,userName,agencyName,agencyLocation,agencyCode,agencyContact,
        agencyEmail,hostYouHave,open,adminId,setUserId,setUserName,setAgencyCode,setAgencyName,setAgencyContact,setAgencyEmail,setAgencyLocation,
        setHostYouHave,setAdminId,handleClose
}
}

export default AgencyRequestHook

