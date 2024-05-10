
import MainCard from 'components/MainCard';
import { Grid} from '@mui/material';
import DataTable from 'react-data-table-component';
import WalletWithdrawHook from './walletHook';
const WalletWithdraw = () => {
  const { data} = WalletWithdrawHook()
    
  const column = [
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: '200px'
    },
    {
      name: "Mobile Number",
      // selector: id,
      cell: row => <div className="custom-cell">{row.mobileNo}</div>,
      width: '180px'

    }, {
      name: "Wallet Type",
      // selector: id,
      cell: row => <div className="custom-cell">{row.walletType}</div>,
      width: '180px'

    }, {
      name: "Wallet Number",
      // selector: id,
      cell: row => <div className="custom-cell">{row.walletNo}</div>,
      width: '200px'
    }, {
      name: "Dollar Value",
      // selector: id,
      cell: row => <div className="custom-cell">{row.dollarValue}</div>,
      // width: '160px'
    }, {
      name: "Create Date",
      // selector: id,
      cell: row => <div className="custom-cell">{row.createDate}</div>,
      width: '200px'
    }, {
      name: "Beans Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.beansAmount}</div>,
      width: '250px'
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
        <div className='text-end'>
          <DataTable columns={column} data={data} fixedHeader customStyles={tableHeaderStyle} className='data-table'
            pagination
          />
        </div>
      </Grid>
    </MainCard>
  )
};

export default WalletWithdraw;






