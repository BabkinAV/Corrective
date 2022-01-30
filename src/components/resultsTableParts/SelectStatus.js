import {React, useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectStatus = ({onStatusSelect}) => {
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
    onStatusSelect(event.target.value);
  };
  return (
    <Box sx={{ width: '10.5rem' }}>
      <FormControl fullWidth>
        <InputLabel id="update-status-label" sx={{ color: '#000'}}>Update Status</InputLabel>
        <Select
          labelId="update-status-label"
          id="demo-simple-select"
          value={status}
          label="Update Status"
          onChange={handleChange}
          color="secondary"
          
        >
          <MenuItem value={"open"}>Open</MenuItem>
          <MenuItem value={"confirmed"}>Confirmed</MenuItem>
          <MenuItem value={"refused"}>Refused</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectStatus;
