import MainCard from 'components/MainCard';
import { Grid, IconButton } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AddDeductBeanHook from './addDeductbeanHook';
const UpdateBeans = () => {
  const { filter, search, setSearch, handleFileChange, handleUpload,handleChange,handleSubmit,handleDeductBean } = AddDeductBeanHook()
  const defaultColumns = [
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
      name: "Image",
      cell: row => (
        <>
          <IconButton
            // onClick={() => handleImageClick(row.image)}
            className='imgPreviewDiv'>
            <img height={70} width={80} src={row.image} alt='no-img' />
          </IconButton>

        </>
      ),
      width: '180px'
    },
    {
      name: "Transaction Type",
      // selector: id,
      cell: row => <div className="custom-cell">{row.transactionType}</div>,
      // width: '160px'
    }, {
      name: "Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.amount}</div>,
      // width: '160px'
    }, {
      name: "Date Time",
      // selector: id,
      cell: row => <div className="custom-cell">{row.dateTime}</div>,
      // width: '160px'
    }

  ]

  const searchColumns = [
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
      name: "Image",
      cell: row => (
        <>
          <IconButton
            // onClick={() => handleImageClick(row.image)}
            className='imgPreviewDiv'>
            <img height={70} width={80} src={row.image} alt='no-img' />
          </IconButton>

        </>
      ),
      // width: '180px'
    },
    {
      name: "Available Beans",
      // selector: id,
      cell: row => <div className="custom-cell">{row.amount}</div>,
      // width: '160px'
    }
    ,
    {
      name: "Amount",
      // selector: id,
      cell: (row) =>{
        const userId =row.userId
        const amount =row.amount
        return(
          <>
          <div className="custom-cell">
            <input type='number' className='form-control p-2' value={amount} placeholder='Enter Bean Value' onChange={e => handleChange(e, userId)}></input>
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
              onClick={handleDeductBean}
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

    <MainCard title="Add/Deduct Beans">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        <div className='text-end'>
          <DataTable  columns={search ? searchColumns : defaultColumns} data={filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
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
                    <input type="file" multiple onChange={handleFileChange} />
                    <button onClick={handleUpload} className='btn btn-primary me-4'
                    style={{ backgroundColor: '#EF9848', border: '0px' }}>Upload Files</button>
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

export default UpdateBeans;







