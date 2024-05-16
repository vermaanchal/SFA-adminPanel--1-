import MainCard from 'components/MainCard';
import {Grid, Select, MenuItem, InputLabel,FormControl } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AssignRoleHook from './AssignRoleHook';
import AddDesignationHook from '../add-designation/AddDesignationHook';
const AssignRole = () => {
  const { filter, search, setSearch, roleId, handleAssignRole,
    handleSelectChange, userValue, setUserValue, handleRemove } = AssignRoleHook()
  const { role } = AddDesignationHook()
  const column = [
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,

    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
      width:'270px'
    },
    {
      name: "Designation Name",
      cell: row => <div className="custom-cell">{row.desigName}</div>,
      width:'300px'
    }, {
      name: "Created Date",
      cell: row => <div className="custom-cell">{row.created_date}</div>,
      width:"280px"
    }, {
      name: 'Action',
      cell: (row) => {
        const userId = row.userId
        return (
          <>
            <button className='btn btn-danger' style={{ backgroundColor: '#EF9848', border: '0px' }}
              onClick={() => handleRemove(userId)}
            >Remove</button>
          </>
        )
      },
      width:'260px'
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
                  <div className='d-flex'>
                    <div>
                      <input type='text' className=' form-control searchInput' placeholder='Enter User Id' value={userValue}
                        onChange={(e) => setUserValue(e.target.value)}></input>
                    </div>
                    <div>
                      {/* <select value={roleId} className='assignroleSelect'
                        onChange={handleSelectChange}>
                        <option>Select Role</option>
                        {role.map((option) => {
                          return (
                            <option key={option.roleId} value={option.roleId}>
                              {option.roleName}
                            </option>

                          )
                        }
                        )}
                      </select> */}
                      <FormControl className='designationForm'>
                        <InputLabel id="select-label">Select Role</InputLabel>
                        <Select
                          labelId="select-label"
                          label='Select Role'
                          id="select"
                          value={roleId}
                          onChange={handleSelectChange}
                          className='selectDiv'
                        >
                          <MenuItem>Select Role</MenuItem>
                          {role.map((option) => (
                            <MenuItem key={option.roleId} value={option.roleId}>
                              {option.roleName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <button className='btn btn-primary ms-4'
                        style={{ backgroundColor: '#EF9848', border: '0px', padding: '10px' }}
                        onClick={handleAssignRole}>Submit</button>
                    </div>
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

export default AssignRole;





