
import MainCard from 'components/MainCard';
import { Grid, Button 
  // ,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import ResellerHook from './resellerHook';
const CreateReseller = () => {
  const { filter, search, setSearch, downloadCSV,handleSubmit,handleSelectChange } = ResellerHook()
 
  const column = [

    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '250px'
    }, {
      name: "Mobile",
      cell: row => <div className="custom-cell">{row.mobile}</div>,
      width: '270px'
    }, {
      name: "Email",
      cell: row => <div className="custom-cell">{row.email}</div>,
      width: '270px'
    },
    {
      name: 'Reseller Type',
      cell: row => {
        const userId= row.userId
        const resellerTypeId =row.resellerTypeId
        return (
          <select value={resellerTypeId} onChange={e => handleSelectChange(e, userId)}>
            <option value="">Select Reseller</option>
            <option value="1">Wood</option>
            <option value="2">Copper</option>
            <option value="3">Silver</option>
            <option value="4">Gold</option>
            <option value="">Remove Reseller</option>
          </select>
        )
      },
      width:'200px'
    },

    {
      name: 'Action',
      cell: () => {
        return (
          <>
            <button
              onClick={()=>handleSubmit()}
              className='btn btn-primary me-4'
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Create
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

  return (

    <MainCard title="Create Reseller">
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
    </MainCard>
  )
};

export default CreateReseller;



