import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const HostRequestHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [agencyCode, setAgencyCode] = useState('');
  const [hostCode, setHostCode] = useState('');
  //---------------------fetch data---------------//

  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}HostRequest`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.hostRequestList);
      setFilter(res.hostRequestList)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  //------------------------serach by userid-----------//

  useEffect(() => {
    const result = data.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
  }, [search])
  //---------------approve-------------------//
  const handleApprove = async ({ agencyCode, userId }) => {
    try {
      await fetch(`${baseURLProd}HostRequestApprove`, {
        method: 'POST',
        body: JSON.stringify({ agencyCode: agencyCode, userId: userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (window.confirm("Are you sure to Approve the Request")) {
        const rowIndex = data.findIndex(item => item.agencyCode === agencyCode);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Approved';
          toast.success("Request Approved successfully")
          setData(updatedData);
          setFilter(updatedData);
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };
  //--------------------reject ------------------------//
  const handleReject = async ({ agencyCode, userId }) => {
    try {
      await fetch(`${baseURLProd}HostRequestReject`, {
        method: 'POST',
        body: JSON.stringify({ agencyCode: agencyCode, userId: userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (window.confirm("Are you sure to Reject the Request")) {
        const rowIndex = data.findIndex(item => item.agencyCode === agencyCode && item.userId === userId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Reject';
          toast.success("Request Rejected successfully")
          setData(updatedData);
          setFilter(updatedData);
          fetchData()
        }
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };
  //----------------------image download-------------------//

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
      .catch(error => console.error('Error downloading image:', error));
  };

  //--------------------image preview------------------//
  const handleImageClick = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
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
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };
  //----------------get user detail---------------//
  const handleEdit = async (userId, name, phone, type, agencyCode, hostCode) => {
    setOpen(true);
    setUserId(userId)
    setName(name)
    setPhone(phone)
    setType(type)
    setAgencyCode(agencyCode)
    setHostCode(hostCode)

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
          name: name,
          type: type,
          phone: phone,
          agencyCode: agencyCode,
          hostCode: hostCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit user details');
      }

      await response.json();
      if (window.confirm("Are you sure to change the host details ?")) {

        fetchData()
        setOpen(false);
        setUserId("")
        setName("")
        setPhone("")
        setType("")
        setAgencyCode("")
        setHostCode("")
        toast.success("user details changed ")
      }
    } catch (error) {
      console.log(error.message);
    }

  };
  const handleClose = () => {
    setOpen(false)
  }
  return {
    filter, search, setSearch, openPreview, setOpenPreview, previewImageUrl, setPreviewImageUrl,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV, handleEdit, handleSubmit, handleClose,
    open, userId, name, type, agencyCode, hostCode, phone, setOpen, setUserId, setName, setType,
    setAgencyCode, setHostCode, setPhone
  }
}

export default HostRequestHook

