import React, { useState } from 'react'
import { Grid, Button,TextField } from '@mui/material'

const ChangePassword = () => {
  const [currentPassword,setCurrentPassword] =useState('')
  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  return (
    <>
      <Grid className='changePassdiv'>
      <h4>Change Password</h4>
        <Grid className='changepassinnerdiv my-4 '>
        <Grid item >
          <TextField
          // margin="dense"
          label="Current Password"
          type="text"
          name="currentPassword"
          fullWidth
          value={currentPassword}
          onChange={(e)=>setCurrentPassword(e.target.value)}
          className='editInputField'
        />
        <TextField
          margin="dense"
          label="New Password"
          type="text"
          name="newPassword"
          fullWidth
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          className='editInputField'
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="text"
          name="confirmPassword"
          fullWidth
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className='editInputField'
        />
        </Grid>
        <Grid className='d-flex justify-content-center'>
          <Button  className='btn btn-primary me-2'
              style={{ backgroundColor: '#EF9848', border: '0px' }}>Submit</Button>
        </Grid>
      </Grid >
      </Grid>
    </>
  )
}

export default ChangePassword
