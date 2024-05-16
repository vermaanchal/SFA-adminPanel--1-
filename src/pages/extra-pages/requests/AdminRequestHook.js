import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AdminRequestHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}AdminRequest`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.adminRequestList);
      setFilter(res.adminRequestList)

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

  const handleApprove = async (adminId) => {
    try {
      await fetch(`${baseURLProd}AdminRequestApprove`, {
        method: 'POST',
        body: JSON.stringify({ adminId: adminId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (window.confirm("Are you sure to approve the request?")) {
        const rowIndex = data.findIndex(item => item.adminid === adminId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Approved';
          toast.success("Request Approved successfully");
          setData(updatedData);

          // Update filteredData if adminId exists in filteredData
          const filteredRowIndex = filter.findIndex(item => item.adminid === adminId);
          if (filteredRowIndex !== -1) {
            const updatedFilteredData = [...filter];
            updatedFilteredData[filteredRowIndex].status = 'Approved';
            setFilter(updatedFilteredData);
          }
        }
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (adminId) => {
    try {
      await fetch(`${baseURLProd}AdminRequestReject`, {
        method: 'POST',
        body: JSON.stringify({ adminId: adminId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (window.confirm("Are you sure to Reject the Request ?")) {
        const rowIndex = data.findIndex(item => item.adminid === adminId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Reject';
          toast.success("Request Rejected successfully");
          setData(updatedData);

          // Update filteredData if adminId exists in filteredData
          const filteredRowIndex = filter.findIndex(item => item.adminid === adminId);
          if (filteredRowIndex !== -1) {
            const updatedFilteredData = [...filter];
            updatedFilteredData[filteredRowIndex].status = 'Reject';
            setFilter(updatedFilteredData);
          }
        }
      }

    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleDownload = () => {
    // console.log(imageUrl,imageName,'url & name ')
    const img = 'https://cdn.dummyjson.com/product-images/10/2.jpg'
    fetch(img)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        const objectURL = URL.createObjectURL(blob);
        link.href = objectURL;
        link.download = 'image.png';
        link.click();
        URL.revokeObjectURL(objectURL);
      })
      .catch(error => console.error('Error downloading image:', error));
  };

  // const downloadImage = (imageUrl, imageName) => {
  //   console.log(imageUrl,"downloaddd")
  //   const canvas = document.createElement('canvas');
  //   console.log(canvas,'canvass')
  //   const context = canvas.getContext('2d');
  //   console.log(context,'contexttt')
  //   const image = new Image();
  //   console.log(image,'imageee')
  //   image.crossOrigin = 'Anonymous';

  //   image.onload = (imageUrl) => {

  //     console.log(imageUrl,'ppp')
  //     canvas.width = image.width;
  //     canvas.height = image.height;
  //     context.drawImage(image, 0, 0);

  //     const dataUrl = canvas.toDataURL('image/png');
  //     console.log(dataUrl,'dataaauRLLL')
  //     const link = document.createElement('a');
  //     console.log(link,'limnnkkkk')
  //     link.href = dataUrl;
  //     link.download = imageName;
  //     link.click();
  //   };

  //   image.src = imageUrl;
  // };

  // const handleDownloadimg = (imageUrl, imageName) => {
  //   localStorage.setItem("imageURL", imageUrl)
  //   localStorage.setItem('imageName', imageName)
  //   handleDownload()
  // };
  // const handleDownload = () => {
  //   const imageUrl = localStorage.getItem('imageURL');
  //   const imageName = localStorage.getItem('imageName');

  //   // Check if image URL is available
  //   if (imageUrl) {
  //     console.log(imageUrl, 'pooppp')

  //     const link = document.createElement('a');
  //     console.log(link, 'linkkkkk')
  //     link.href = imageUrl;
  //     console.log(link.href, 'hrefff')
  //     link.download = imageName;
  //     // Append the anchor element to the document body
  //     document.body.appendChild(link);

  //     // Simulate click on the anchor element to trigger download
  //     link.click();

  //     // Remove the anchor element from the document body after the download
  //     document.body.removeChild(link);
  //   }
  //   else {
  //     console.error('Image URL not found in localStorage');
  //   }
  // };
  //-------------------image preview---------------//
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

  return {
    filter, search, setSearch, openPreview, setOpenPreview, previewImageUrl, setPreviewImageUrl,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV,
  }
}

export default AdminRequestHook

