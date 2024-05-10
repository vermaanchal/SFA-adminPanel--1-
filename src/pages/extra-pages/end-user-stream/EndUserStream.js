
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import DataTable from 'react-data-table-component';
import EndUserStreamHook from './ENdUserStreamHook';
import { ToastContainer } from 'react-toastify';
const EndUserStream = () => {
    const {data,handleAdd,message} =EndUserStreamHook()
  const column = [
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      // width: '100px'
    },
    {
      name: "Live Status",
      // selector: id,
      cell: row => <div className="custom-cell">{row.liveStatus}</div>,
      // width: '160px'
    }, {
      name: 'Action',
      cell: (row) => {
        const userId = row.userId
        return (
          <>
            <button className='btn btn-danger' style={{ backgroundColor: '#EF9848', border: '0px' }}
              onClick={() => handleAdd(userId)}
            >Live End</button>
          </>
        )
      }
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
        </Grid>
        {data ?
        <div className='text-end'>
          <DataTable columns={column} data={data} fixedHeader customStyles={tableHeaderStyle} className='data-table'
            pagination
          />
        </div>
        : 
          {message}
        }
        <ToastContainer/>
      </Grid>
    </MainCard>
  )
};

export default EndUserStream;






