
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton, Button, TextField, DialogTitle, DialogActions } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AgencyRequestHook from './AgencyRequestHook';
const AgencyRequest = () => {
  const { filter, search, openPreview, previewImageUrl, setSearch,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV, handleEdit, handleSubmit, userId, userName, agencyName, agencyLocation, agencyCode, agencyContact,
    agencyEmail, hostYouHave, open, adminId, setUserId, setUserName, setAgencyCode, setAgencyName, setAgencyContact, setAgencyEmail, setAgencyLocation,
    setHostYouHave, setAdminId, handleClose } = AgencyRequestHook()

  const column = [

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width:"100px"
    },
    {
      name: "Agency Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyName}</div>,
      width: "150px"
    }, {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: "150px"
    }, {
      name: "Agency Location",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyLocation}</div>,
      width: "150px"
    },
    {
      name: "Agency Contact",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyContact}</div>,
      width: "150px"
    },
    {
      name: "Agency Email",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyEmail}</div>,
      width: "200px"
    },
    {
      name: "Host You Have",
      // selector: id,
      cell: row => <div className="custom-cell">{row.hostYouHave}</div>,
      width: "150px"
    },
    {
      name: "Admin Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminId}</div>,
      width: "120px"
    },
    {
      name: "Front Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.frontPhoto)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.frontPhoto} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.frontPhoto, 'image.jpg')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: "150px"
    },
    {
      name: "Back Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.backPhoto)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.backPhoto} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.backPhoto, 'image.jpg')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: "150px"
    },
    {
      name: "Agency Code",
      // selector: price,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      width: '150px'
    },
    {
      name: "Status",
      // selector: category,
      cell: row => <div className="custom-cell">{row.status}</div>,

    },

    {
      name: 'Action',
      cell: (row) => {
        const agencyCode = row.agencyCode;
        const userId = row.userId;
        const adminId = row.adminId;
        const userName = row.userName;
        const agencyName = row.agencyName;
        const agencyLocation = row.agencyLocation;
        const agencyContact = row.agencyContact;
        const agencyEmail = row.agencyEmail;
        const hostYouHave = row.hostYouHave;

        const isApproved = row.status === 'Approve';
        const isRejected = row.status === 'Reject';
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={() => handleApprove(agencyCode, userId)}
              disabled={isApproved}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Approve
            </button>
            <button
              className='btn btn-primary'
              onClick={() => handleReject(agencyCode, userId)}
              disabled={isRejected}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Reject
            </button>
            <span className='editrequestbtn'>
              <EditCalendarOutlinedIcon onClick={() => {
                handleEdit( userId,agencyName, userName, agencyLocation, agencyContact, agencyEmail, hostYouHave,adminId,agencyCode );
              }} style={{ color: 'white', cursor: "pointer" }} />
            </span>
          </>
        );
      },
      width: '270px'

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
                    <div className='searchIcon'><SearchOutlinedIcon /></div>
                  </div>
                  <div>
                    <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='editTitle'>Edit Agency Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            label="User ID"
            type="text"
            name="userId"
            value={userId}
            className='editInputField'
            onChange={(e) => setUserId(e.target.value)}
          // style={{ display: 'none' }} // Hidden field
          />
          <TextField
            margin="dense"
            label="Agency Name"
            type="text"
            name="agencyName"
            fullWidth
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            name="userName"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Location"
            type="text"
            name="agencyLocation"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={agencyLocation}
            onChange={(e) => setAgencyLocation(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Contact"
            type="tel"
            name="agencyContact"
            fullWidth
            value={agencyContact}
            onChange={(e) => setAgencyContact(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Email"
            type="email"
            name="agencyEmail"
            fullWidth
            value={agencyEmail}
            onChange={(e) => setAgencyEmail(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Host you have"
            type="text"
            name="hostYouHave"
            fullWidth
            value={hostYouHave}
            onChange={(e) => setHostYouHave(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Admin Id"
            type="number"
            name="adminId"
            fullWidth
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Code"
            type="number"
            name="agencyCode"
            fullWidth
            value={agencyCode}
            onChange={(e) => setAgencyCode(e.target.value)}
            className='editInputField'
          />
        </DialogContent>
        <DialogActions className='editButtonDiv'>
          <Button onClick={handleClose} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  )
};

export default AgencyRequest;



