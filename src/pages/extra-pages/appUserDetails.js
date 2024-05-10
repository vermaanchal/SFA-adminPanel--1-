import MainCard from 'components/MainCard';
import { Grid, Dialog,DialogTitle, DialogContent, DialogActions, TextField,Button  } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Hook from './Hook';
import { ToastContainer } from 'react-toastify';
const AppUserDetails = () => {
  const { filter, search, openPreview, previewImageUrl, setSearch,
    handleClosePreview, handleDelete, handleEdit ,setUserId,setName,setDob,setMobile,setEmail,setPassword
    ,userId,name,dob,mobile,email,password,downloadCSV,
    open,handleClose,handleSubmit} = Hook()

  const column = [
    {
      name: 'User Id',
      selector: row => row.userId,
    },
    {
      name: "Name",
      selector: row => row.name,
      width: '190px'
    },
    {
      name: 'Mobile No',
      selector: row => row.mobile,
      width:'150px'
    },
    {
      name: 'Email',
      selector: row => row.email,
      width: "240px"
    },
    {
      name: 'Password',
      selector: row => row.password,
      width: "150px"
    },
    {
      name: 'DOB',
      selector: row => row.dob,
    },
    {
      name: 'Agency',
      selector: row => row.agency,
    },
    {
      name: 'Admin',
      selector: row => row.admin,
    },
    {
      name: 'Country',
      selector: row => row.country,
    },
    {
      name: 'Action',
      cell: (row) => {
        const userId = row.userId;
        const name =row.name;
        const mobile =row.mobile;
        const email =row.email;
        const password =row.password;
        const dob= row.dob;
        return(
        <>
          <div className='py-4'>
            <span className='editIcon'>
              <EditCalendarOutlinedIcon  onClick={() => {
              handleEdit(userId,name,mobile,email,password,dob);
            }}  style={{ color: 'orange',cursor:"pointer" }} />
            </span>
            <span className='deleteIcon' >
              <DeleteOutlinedIcon onClick={() => handleDelete(userId)} style={{ color: 'red',cursor:"pointer" }} />
            </span>
          </div>
        </>
        )
        },
        width:"200px"
    }
  ]
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "17px",
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
          fontFamily: "'Public Sans',sans-serif",
        }
      }
    }
  }
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
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='editTitle'>Edit User Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          // margin="dense"
          label="User ID"
          type="text"
          name="userId"
          value={userId}
          onChange={(e)=>setUserId(e.target.value)}
          style={{ display: 'none' }} // Hidden field
        />
        <TextField
          margin="dense"
          label="Name"
          type="text"
          name="name"
          fullWidth
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='editInputField'
        />
        <TextField
          margin="dense"
          label="Mobile Number"
          type="tel"
          name="mobile"
          fullWidth
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          className='editInputField'
        />
        <TextField
          margin="dense"
          label="Date of Birth"
          type="date"
          name="dob"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={dob}
          onChange={(e)=>setDob(e.target.value)}
          className='editInputField'
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          name="email"
          fullWidth
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='editInputField'
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          name="password"
          fullWidth
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className='editInputField'
        />
      </DialogContent>
      <DialogActions className='editButtonDiv'>
        <Button onClick={handleClose} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    </MainCard>
  )
};

export default AppUserDetails;
