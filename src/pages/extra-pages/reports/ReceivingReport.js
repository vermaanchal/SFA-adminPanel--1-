import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import ReceivingReportHook from './ReceivingReportHook';
const ReceivingReport = () => {
  const { filter, search, setSearch, downloadCSV, handleFilter, fromDate, toDate, setFromDate, setToDate } = ReceivingReportHook()

  const column = [
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      // width: '150px'
    },

    {
      name: "Agency Code ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      // width: '160px'
    },
    {
      name: "Admin Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminId}</div>,
      // width: '160px'
    }
    , {
      name: "Available Beans ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.availableBeans}</div>,
      width: '200px'
    }
    , {
      name: "Receiving ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.receiving}</div>,
      // width: '160px'
    }, {
      name: " Month Date ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.date}</div>,
      // width: '200px'
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
      cells: {
        style: {
          fontSize: "0.875rem",
          fontFamily: "'Public Sans',sans-serif"
        }
      }
    }
  }

  return (

    <MainCard title="Total Receiving Report">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
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
                    <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                  </div>
                </div>
                <div className='my-4 d-flex justify-content-end'>
                  <label htmlFor='fromDate' className='labelfordate'>From Date:</label>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className=' form-control searchDateInput' />
                  <label htmlFor='toDate' className='labelfordate'>To Date:</label>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className=' form-control searchDateInput' />
                  <button className='btn btn-primary'
                    style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleFilter}>Search</button>
                </div>
              </>
            }
          />
        </div>
      </Grid>
    </MainCard>
  )
};

export default ReceivingReport;







