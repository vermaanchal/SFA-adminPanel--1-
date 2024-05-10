import MainCard from 'components/MainCard';
import { Grid,Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AudioStreamingHook from './AudioStreamingHook';
const AudioStreaming = () => {
  const {filter, search, setSearch,downloadCSV,handleViewToday,handleViewMonthly,message}  =AudioStreamingHook()

  const column = [
   
    {
      name: "User Id",
      // selector: id,
      cell : row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "Date",
      // selector: id,
      cell : row => <div className="custom-cell">{row.date}</div>,
      // width: '120px'
    },{
      name: "Live Time",
      // selector: id,
      cell : row => <div className="custom-cell">{row.liveTime}</div>,
      // width: '120px'
    },{
      name: "Today Live Count",
      // selector: id,
      cell : row => <div className="custom-cell">{row.todayLiveCount}</div>,
      // width: '180px'
    },{
      name: "Gift Count",
      // selector: id,
      cell : row => <div className="custom-cell">{row.giftCount}</div>,
      // width: '150px'
    },
    {
      name: 'Action',
      cell: (row) => {
        const userId =row.userId;
        return (
          <>
            <button
              className='btn btn-primary me-2'
              style={{ backgroundColor: '#EF9848', border: '0px' }}
              onClick={()=>handleViewToday(userId)}
              // disabled={isApproved}
            >
              Today
            </button>
            <button
              className='btn btn-primary'
              onClick={()=>handleViewMonthly(userId)}
              // disabled={isRejected}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Monthly
            </button>
          </>
        );
      },
      width: '210px'

    }
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
      cells:{
        style:{
          fontSize:"0.875rem",
          fontFamily:"'Public Sans',sans-serif"
        }
      }
    }
  }

  return (

    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer/>
        </Grid>
        <div className='text-end'>
          {filter ?
          <DataTable columns={column} data={filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination 
            subHeader
            subHeaderComponent={
              <>
              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
                    onChange={(e) => setSearch(e.target.value)}></input>
                  <div className='searchIcon'><SearchOutlinedIcon /></div>
                </div>
                <div>
                    <Button className='csvDiv'onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                  </div>
              </div>
              </>
            }
          />
          :
          {message}
        }
        </div>
      </Grid>
    </MainCard>
  )
};

export default AudioStreaming;


