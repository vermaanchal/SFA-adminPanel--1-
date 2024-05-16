
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';
const VideoStreamingTodayReport = () => {

  const params = useParams()
  const [data, setData] = useState([]);

  //---------------fetch data---------------//
  const fetchData = async () => {
    try {
      let req = await fetch(`${baseURLProd}UserTodayVideoStreamingDetails`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: params.userId }),
      });

      const res = await req.json();
      setData(res.userAudioStreamingList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBack = () => {
    window.location.assign('/videostreaming')
  }
  const column = [
    {
      name: "Status",
      cell: row => <div className="custom-cell">{row.isLive}</div>,
    },
    {
      name: "Date",
      cell: row => <div className="custom-cell">{row.date}</div>,
    },
    {
      name: "Live Start Time",
      cell: row => <div className="custom-cell">{row.liveStartTime}</div>,
    },
    {
      name: "Live End Time",
      cell: row => <div className="custom-cell">{row.liveEndTime}</div>,
    },
    {
      name: "Live Duration",
      cell: row => <div className="custom-cell">{row.liveDUration}</div>,
    },
    {
      name: "Valid Day",
      cell: row => <div className="custom-cell">{row.isValidDay}</div>,
    },
  ]
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "0.875rem",
        backgroundColor: "rgba(241,244,249,255)",
      },
      head: {
        style: {
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }
      },
      cells: {
        style: {
          fontSize: "0.875rem",
          fontFamily: "'Public Sans',sans-serif"
        }
      }
    }
  }

  return (

    <MainCard title="User Today Report">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        <div><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBack}>Back</button></div>
        <div className='text-end'>
          <DataTable columns={column} data={data} fixedHeader customStyles={tableHeaderStyle} className='data-table'
            pagination
          />
        </div>
      </Grid>
    </MainCard>
  )
};

export default VideoStreamingTodayReport;




