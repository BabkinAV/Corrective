import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import banner from '../../assets/img/LearnMoreModal.png';

const modalStyle = {
  position: 'absolute',
  top: '10%',
  left: '10%',
  right: '10%',
  minHeight: 400,
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const imgStyle = {
  backgroundSize: 'cover',
  backgroundColor: 'grey',
}

const LearnMoreModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Grid container>
          <Grid item xs={6}>
            <img src={banner} alt="" sx={{w: '100%', h: '100%'}}/>
          </Grid>
          <Grid item xs={6}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Some stuff will be here soon...
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default LearnMoreModal;
