
import MainCard from 'components/MainCard';
import { Grid,IconButton,Dialog, DialogContent, } from '@mui/material';
import DataTable from 'react-data-table-component';
import FeedbackReportHook from './feedbackReportHook';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const UserReportnFeedback = () => {
    const {data,openPreview,previewImageUrl,handleClosePreview,handleImageClick} =FeedbackReportHook()
  const column = [
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },

    {
      name: "Feedback Image",
      cell: row => (
        <>
          <IconButton 
          onClick={() => handleImageClick(row.feedbackImage)}
           className='imgPreviewDiv'>
            <img height={70} width={80} src={row.feedbackImage} alt='no-img' />
          </IconButton>
          
        </>
      ),
      // width: '180px'
    },
    {
      name: "Message",
      // selector: id,
      cell: row => <div className="custom-cell">{row.message}</div>,
      // width: '160px'
    },
    //  {
    //   name: "Type",
    //   // selector: id,
    //   cell: row => <div className="custom-cell">{row.type}</div>,
    //   // width: '160px'
    // }, 
    {
      name: "Date",
      // selector: id,
      cell: row => {
        const dateOnly = row.date.split(' ')[0];
        return <div className="custom-cell">{dateOnly}</div>;
    },
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
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default UserReportnFeedback;






