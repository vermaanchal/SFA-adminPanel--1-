import { baseURLProd } from 'api/api';
import{ useEffect, useState } from 'react'
const RequestHook = () => {
 
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

const handleDownload = (imageUrl, imageName) => {
  fetch(imageUrl)
      .then(response => response.blob())
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

  const handleViewMore = async (adminId) => {
      window.location.href = `/AdminAgencyHost/${adminId}`;
  };

  return {
    filter, search,  setSearch,openPreview, setOpenPreview,previewImageUrl, setPreviewImageUrl,
    handleClosePreview, handleImageClick, handleDownload,downloadCSV,handleViewMore
}
}

export default RequestHook

