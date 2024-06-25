
import MainCard from 'components/MainCard';
import { Grid, Button, Dialog, DialogContent } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import StatusHook from './StatusHook';

const IdBanUnban = () => {
  const { filter, search, setSearch, handleIdUnban, downloadCSV, handleBanClick, handleInputChange,
    openPreview, handleClosePreview, handlePopup, idBanReason, validationMessage ,data,handleReset } = StatusHook()

  const column = [

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      width: "150px"
    },
    {
      name: "Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: "170px"
    }, {
      name: "Phone",
      // selector: id,
      cell: row => <div className="custom-cell">{row.mobile}</div>,
      width: "170px"
    }, {
      name: "Email",
      // selector: id,
      cell: row => <div className="custom-cell">{row.email}</div>,
      width: "250px"
    },
    {
      name: "Block Count",
      // selector: id,
      cell: row => <div className="custom-cell">{row.blockCount}</div>,
      width: "150px"
    },
    {
      name: "Block Time",
      // selector: id,
      cell: row => <div className="custom-cell">{row.blockTime}</div>,
      // width:"150px"
    },
    {

      name: "ID Ban Reason",
      // selector: id,
      cell: row => <div className="custom-cell">{row.iD_BanReason}</div>,
      width: "150px"
    },

    {
      name: "Block Date",
      // selector: category,
      cell: row => <div className="custom-cell">{row.blockDate}</div>,
      width: "150px"
    },
    {
      name: "Block Duration",
      // selector: category,
      cell: row => <div className="custom-cell">{row.blockDuration}</div>,
      width: "150px"
    },
    {
      name: 'Action',
      cell: (row) => {
        const userId = row.userId;
        const isBanned = row.status === 'False';
        const isUnbanned = row.status === 'True';
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={() => handlePopup(userId)}
              disabled={isBanned}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Id Ban
            </button>
            <button
              className='btn btn-primary'
              onClick={() => handleIdUnban(userId)}
              disabled={isUnbanned}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Id UnBan
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
  const isFiltered = filter.length !== data.length;

  return (

    <MainCard title="Id Ban/UnBan">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        {isFiltered && (
          <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
        )}
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
      <Dialog open={openPreview} onClose={handleClosePreview} className='idBanModal'>
        <DialogContent>
          {/* <img src={previewImageUrl} alt="Preview" width='260px' /> */}
          <div>
            <h5 style={{ textDecoration: "underline", marginBottom: "15px" }}>User Id Ban Reason </h5>
          </div>
          <div className='p-2'><b>Ban Reason</b><span style={{ color: 'red' }}>*</span></div>
          <div>
            <textarea required style={{ width: "100%", height: "139px" }} placeholder='Enter here (Minimum 20,Maximum 200 characters)'
              value={idBanReason}
              onChange={handleInputChange} />
            {validationMessage && (
              <div style={{ color: 'red', marginTop: '4px' }}>
                {validationMessage}
              </div>
            )}
          </div>
          <div className='d-flex justify-content-end mt-3'>
            <button className='btn btn-primary me-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleClosePreview} >Cancel</button>
            <button className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBanClick}>Save</button>
          </div>
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default IdBanUnban;


