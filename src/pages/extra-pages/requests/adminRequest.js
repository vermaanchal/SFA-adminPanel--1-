
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton, Button, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AdminRequestHook from './AdminRequestHook';
const AdminRequest = () => {
  const { filter, search, setSearch, openPreview, previewImageUrl, handleClosePreview, handleImageClick,status
    , handleApprove, handleReject, downloadCSV, handleDownload, data,
     handleReset,handleStatusChange,handleSubmit,showApproveButton,showRejectButton } = AdminRequestHook()

  const column = [

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      width: '100px'
    },
    {
      name: "Admin Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminName}</div>,
      width: '150px'
    }, {
      name: "Contacts",
      // selector: id,
      cell: row => <div className="custom-cell">{row.contacts}</div>,
      width: '160px'
    }, {
      name: "Whatsapp",
      // selector: id,
      cell: row => <div className="custom-cell">{row.whatsapp}</div>,
      width: '160px'
    }, {
      name: "Agency You Have",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyYouHave}</div>,
      width: '160px'
    },
    {
      name: "Front Admin Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.adminPhotoFrontImage)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.adminPhotoFrontImage} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.adminPhotoFrontImage, 'image.png')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Back Admin Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.adminPhotoBackImage)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.adminPhotoBackImage} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload()} style={{ color: '#EF9848', cursor: "pointer" }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Admin Id",
      // selector: price,
      cell: row => <div className="custom-cell">{row.adminid}</div>,
    },
    {
      name: "Status",
      // selector: category,
      cell: row => <div className="custom-cell">{row.status}</div>,

    },

    {
      name: 'Action',
      cell: (row) => {
        // const adminId = row.adminid;
        // const isApproved = row.status === 'Approved';
        // const isRejected = row.status === 'Reject';
        return (
          <>
              {status === '' && (
                  <>
                    <button
                      className='btn btn-primary me-2'
                      onClick={() => handleApprove(row.adminid)}
                      disabled={row.status === 'Approved'}
                      style={{ backgroundColor: '#EF9848', border: '0px' }}
                    >
                      Approve
                    </button>
                    <button
                      className='btn btn-primary me-2'
                      onClick={() => handleReject(row.adminid)}
                      disabled={row.status === 'Rejected'}
                      style={{ backgroundColor: '#EF9848', border: '0px' }}
                    >
                      Reject
                    </button>
                  </>
                )}
                  {status === 'Approved' && showApproveButton && (
                  <button
                    className='btn btn-primary me-2'
                    onClick={() => handleApprove(row.id)}
                    disabled={row.status === 'Approved'}
                    style={{ backgroundColor: '#EF9848', border: '0px' }}
                  >
                    Approved
                  </button>
                )}
                {status === 'Rejected' && showRejectButton && (
                  <button
                    className='btn btn-primary'
                    onClick={() => handleReject(row.id)}
                    disabled={row.status === 'Rejected'}
                    style={{ backgroundColor: '#EF9848', border: '0px' }}
                  >
                    Rejected
                  </button>
                )}
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
      cells: {
        style: {
          fontSize: "0.875rem",
          fontFamily: "'Public Sans',sans-serif"
        }
      }
    }
  }
  // const filteredColumns = column.filter(col => col.name !== 'Action'); 
  const isFiltered = filter.length !== data.length;

  return (

    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        {isFiltered && (
          <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
        )}
        <div className='text-end'>
          <DataTable
            columns={column}
            data={filter}
            fixedHeader
            customStyles={tableHeaderStyle}
            className='data-table'
            pagination
            subHeader
            subHeaderComponent={
              <>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <input
                      type='text'
                      className='form-control searchInput'
                      placeholder='Search User Id'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='searchIcon'>
                      <SearchOutlinedIcon />
                    </div>
                  </div>
                  <div className=''>
                    <div className='d-flex'>

                  <FormControl style={{ width: '175px' }}>
                    <InputLabel id="select-label">Select Status</InputLabel>

                    <Select
                      labelId="select-label"
                      label='Select Role'
                      id="select"
                      style={{textAlign:"center"}}
                    // value={roleId}
                    // onChange={handleSelectChange}
                    // className='selectDiv'
                    >
                      <MenuItem value="1" onClick={() => handleStatusChange('Approved')}>Approved</MenuItem>
                      <MenuItem value="2"onClick={() => handleStatusChange('Rejected')}>Rejected</MenuItem>
                    </Select>
                  </FormControl>
                  <div className='mx-3 d-flex'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }}onClick={handleSubmit}>Submit</button></div>
                  </div>
                    </div>
                  <div>
                    <Button className='csvDiv' onClick={downloadCSV}>
                      Download
                      <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                    </Button>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default AdminRequest;


