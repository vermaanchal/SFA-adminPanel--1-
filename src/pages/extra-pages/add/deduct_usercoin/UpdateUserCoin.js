
import MainCard from 'components/MainCard';
import { Grid ,IconButton} from '@mui/material';
import DataTable from 'react-data-table-component';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import UpdateUsercoinHook from './updateUsercoinHOok';
import demoImage from '../../../../assets/images/users/sfaLogo.png'
const UpdateUserCoin = () => {
  const { filter, search, setSearch,handleChange,handleSubmit,handleDeductCoin,
    newSearchData } = UpdateUsercoinHook()

  const defaultColumns = [
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
    },
    {
      name: "Image",
      cell: row => (
        <>
        {row.image?
          <IconButton 
           className='imgPreviewDiv'>
            <img height={70} width={80} src={row.image} alt='no-img' />
          </IconButton>
          :
          <IconButton className='imgPreviewDiv'>
          <img height={70} width={80} src={demoImage} alt='no-img' />
        </IconButton>
        }
        </>
      ),
      width: '180px'
    },
    {
      name: "Transaction Type",
      cell: row => <div className="custom-cell">{row.transactionType}</div>,
    }, {
      name: "Amount",
      cell: row => <div className="custom-cell">{row.availableAmount}</div>,
    }, {
      name: "Date Time",
      cell: row => <div className="custom-cell">{row.dateTime}</div>,
    }
  
  ]
  const searchColumns = [
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
    },
    {
      name: "Image",
      cell: row => (
        <>
          <IconButton
            className='imgPreviewDiv'>
            <img height={70} width={80} src={row.image} alt='no-img' />
          </IconButton>

        </>
      ),
    },
    {
      name: "Available Coins",
      cell: row => <div className="custom-cell">{row.availableCoins}</div>,
    }
    ,
    {
      name: "Amount",
      cell: (row) =>{
        const userId =row.userId
        const amount =row.amount
        return(
          <>
          <div className="custom-cell">
            <input type='number' className='form-control p-2' value={amount} placeholder='Enter Coin Value' onChange={e => handleChange(e, userId)}></input>
          </div>
          </>
        )
      },
      
    }
    ,
    {
      name: 'Action',
      cell: () => {
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={handleSubmit}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Add
            </button>
            <button
              className='btn btn-primary me-2'
              onClick={handleDeductCoin}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Deduct
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
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
             onChange={(e) => setSearch(e.target.value)}></input>
            <div className='searchIcon' ><SearchOutlinedIcon
              style={{ cursor: "pointer" }} /></div>
          </div>
          {/* <div>
            <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
          </div> */}
        </div>
        <div className='text-end mt-3'>
          <DataTable columns={search ? searchColumns:defaultColumns } data={search ? newSearchData :filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
            pagination
          />
        </div>
      </Grid>
    </MainCard>
  )
};

export default UpdateUserCoin;




