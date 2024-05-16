import MainCard from 'components/MainCard';
import { Grid, IconButton } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AddDeductBeanHook from './addDeductbeanHook';
const UpdateBeans = () => {
  const { filter, search, setSearch, selectedFiles, handleFileChange, handleUpload } = AddDeductBeanHook()
  console.log(selectedFiles)
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
                    <input type="file" multiple onChange={handleFileChange} />
                    <button onClick={handleUpload} className='btn btn-primary me-4'
                    style={{ backgroundColor: '#EF9848', border: '0px' }}>Upload Files</button>
                    {/* <div>
                      <ul>
                        {Array.from(selectedFiles).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div> */}
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







