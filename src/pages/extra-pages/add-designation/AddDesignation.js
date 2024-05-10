import MainCard from 'components/MainCard';
// import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { Select, MenuItem, InputLabel,FormControl } from '@mui/material';

import AddDesignationHook from './AddDesignationHook';
import { ToastContainer } from 'react-toastify';
const AddDesignation = () => {
  const { role, features, handleSelectChange, roleId, featureId, handlefeatureSelectChange,handleCreateDesignation } = AddDesignationHook()

  return (
    <MainCard title="Add Designation">
      <div className='row'>
        <div className='col text-center'>
          <ToastContainer/>
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
        <div className='col text-center'>
          <FormControl className='designationForm'>
          <InputLabel id="select-label">Select Feature</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            label='Select Feature'
            multiple
            value={featureId}
            onChange={handlefeatureSelectChange}
            className='selectDiv'
          >
            <MenuItem>Select Features</MenuItem>
            {features.map((option) => (
              <MenuItem key={option.featureId} value={option.featureId}>
                {option.featureName}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>
        <div className='col text-center'>
          <button className='btn btn-primary me-2'
            onClick={() => handleCreateDesignation()}
            style={{ backgroundColor: '#EF9848', border: '0px',padding:"8px" }}>Submit</button>
        </div>
      </div>
    </MainCard>
  );
}

export default AddDesignation;
