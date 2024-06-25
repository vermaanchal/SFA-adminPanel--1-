
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const FeedbackReportHook = () => {
    const [data,setData] =useState([]);
    const [openPreview, setOpenPreview] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');

    const fetchData= async()=>{
        const req= await fetch(`${baseURLProd}GetReport_Feedback_Details`,{
            method:"GET",
            'Content-type':"application/json"
        })
        const res =await req.json()
        setData(res.reportFeedbackList)
    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleImageClick = (imageUrl) => {
      setPreviewImageUrl(imageUrl);
      setOpenPreview(true);
    };
    const handleClosePreview = () => {
      setOpenPreview(false);
    };
  return {
    data,openPreview,previewImageUrl,handleClosePreview,handleImageClick
  }
}

export default FeedbackReportHook
