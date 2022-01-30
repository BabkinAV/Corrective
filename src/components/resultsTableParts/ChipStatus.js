import React from 'react';
import { Chip } from '@mui/material';

//icons
import DoneIcon from '@mui/icons-material/Done';
import InfoIcon from '@mui/icons-material/Info';
import StopIcon from '@mui/icons-material/DoNotDisturbOn';


function ChipStatus({status}) {
  if (status === 'open') {
    return (
      <Chip
        label="Open"
        color="secondary"
        variant="outlined"
        size="small"
        icon={<InfoIcon />}
      />
    );
  } else if (status === 'confirmed') {
    return (
      <Chip
        label="Confirmed"
        color="success"
        variant="outlined"
        size="small"
        icon={<DoneIcon />}
      />
    );
  } else if (status === 'refused') {
    return (
      <Chip
        label="Refused"
        color="error"
        variant="outlined"
        size="small"
        icon={<StopIcon />}
      />
    );
  } else return 'status unknown';
}

export default ChipStatus;


