
import MainCard from 'components/MainCard';
import { Grid} from '@mui/material';
import DataTable from 'react-data-table-component';
import BankDetailHook from './BankDetailHook';
const BankWithdraw = () => {
  const { data} = BankDetailHook()
    
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
      name: "Dollar Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.dollarAmount}</div>,
      width: '180px'
    }, {
      name: "Account Number",
      // selector: id,
      cell: row => <div className="custom-cell">{row.accountNo}</div>,
      width: '200px'
    }, {
      name: "Bank Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.bankName}</div>,
      // width: '160px'
    }, {
      name: "Withdraw Date",
      // selector: id,
      cell: row => <div className="custom-cell">{row.withdrawDate}</div>,
      // width: '160px'
    }, {
      name: "Branch Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.branchName}</div>,
      width: '250px'
    }, {
      name: "IFSC Code",
      // selector: id,
      cell: row => <div className="custom-cell">{row.ifcsCode}</div>,
      // width: '160px'
    }, {
      name: "Beans Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.beansAmount}</div>,
      width: '130px'
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

export default BankWithdraw;





