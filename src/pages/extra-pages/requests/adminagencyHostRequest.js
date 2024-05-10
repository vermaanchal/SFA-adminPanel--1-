
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton ,Button} from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import RequestHook from './RequestHook';
const AdminAgencyHostRequest = () => {
  const { filter, search, setSearch, openPreview, previewImageUrl, handleClosePreview, handleDownload, handleImageClick
    ,downloadCSV,handleViewMore } = RequestHook()
    
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
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.adminPhotoFrontImage, 'image.jpg')} style={{ color: '#EF9848' }} />
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
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.adminPhotoBackImage, 'image.jpg')} style={{ color: '#EF9848' }} />
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
        const adminId = row.adminid;
        // console.log(adminId)
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={()=>handleViewMore(adminId)}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              View More
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
      cells: {
        style: {
          fontSize: "0.875rem",
          fontFamily: "'Public Sans',sans-serif"
        }
      }
    }
  }
  // const filteredColumns = column.filter(col => col.name !== 'Action'); 

  return (

    <MainCard title="App User Details">
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
                    <div className='searchIcon'><SearchOutlinedIcon/></div>
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
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default AdminAgencyHostRequest;




