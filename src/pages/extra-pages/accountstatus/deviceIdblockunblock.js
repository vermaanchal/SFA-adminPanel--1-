
import MainCard from 'components/MainCard';
import { Grid,Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import DeviceIdBlockUnblockHook from './deviceblockUnblockHook';
const DeviceIdBlockUnblock = () => {
  const {filter, search, setSearch, handleBlock,
  handleUnblock, downloadCSV,handleReset,data} =DeviceIdBlockUnblockHook()

  const column = [
   
    {
      name: "User Id",
      cell : row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "Name",
      cell : row => <div className="custom-cell">{row.name}</div>,
      width: '200px'
    },{
      name: "Mobile Number",
      cell : row => <div className="custom-cell">{row.mobile}</div>,
      width: '210px'
    },{
      name: "Email",
      cell : row => <div className="custom-cell">{row.email}</div>,
      width: '280px'
    },{
      name: "Password",
      cell : row => <div className="custom-cell">{row.password}</div>,
      width: '170px'
    },
    {
      name: "Device Id",
      cell : row => <div className="custom-cell">{row.deviceId}</div>,
      width:'170px'
    },
    {
      name: 'Action',
      cell: (row) => {
        const deviceId = row.deviceId;
        const userId =row.userId;
        const isBlocked = row.deviceStatus === 'False';
        const isUnblocked = row.deviceStatus === 'True';
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={() => handleBlock({deviceId,userId})}
              disabled={isBlocked}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Block
            </button>
            <button
              className='btn btn-primary'
              onClick={() => handleUnblock({deviceId,userId})}
              disabled={isUnblocked}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Unblock
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
  const isFiltered = filter.length !== data.length;

  return (

    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer/>
        </Grid>
        {isFiltered && (
          <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
        )}
        <div className='text-end'>
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
        </div>
      </Grid>
    </MainCard>
  )
};

export default DeviceIdBlockUnblock;


