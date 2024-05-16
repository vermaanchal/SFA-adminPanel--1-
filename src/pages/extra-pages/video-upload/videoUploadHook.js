import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';

const VideoUploadHook = () => {

    const [openPreview, setOpenPreview] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [openVideoPreview, setOpenVideoPreview] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])

    const handleImageClick = (imageUrl) => {
        setPreviewImageUrl(imageUrl);
        setOpenPreview(true);
    };
    const handleClosePreview = () => {
        setOpenPreview(false);
    };

    const handleVideoPreview = (videoUrl) => {
        setVideoUrl(videoUrl);
        setOpenVideoPreview(true);
    };

    const handleCloseVideoPreview = () => {
        setOpenVideoPreview(false);
    };
    //download image //
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

    const fetchData = async () => {
        try {
            let req = await fetch(`${baseURLProd}VideoDetails`, {
                method: "GET",
                'Content-Type': 'application/json',

            })
            const res = await req.json();
            setData(res.videoDetailsList);
            setFilter(res.videoDetailsList)
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
            return item.userid.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFilter(result)
    }, [search])

    const handleDelete = async (userId, videoId) => {
        await fetch(`${baseURLProd}DeleteVideo`, {
            method: "POST",
            body: JSON.stringify({ userId: userId, videoId: videoId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (window.confirm("Are you sure to delete this data")) {
            const newData = data.filter(row => (row.userid !== userId && row.videoid !== videoId));
            setFilter(newData);
            fetchData();
            toast.success("Video deleted successfully")
        }
    }

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
        openPreview, previewImageUrl, openVideoPreview, videoUrl, setSearch, handleImageClick,
        handleClosePreview, handleVideoPreview, handleCloseVideoPreview, handleDownload, handleDelete,
        downloadCSV, filter, search
    }
}

export default VideoUploadHook
