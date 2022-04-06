import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import banner from '../../assets/img/LearnMoreModal.jpg';

import LoadingButton from '@mui/lab/LoadingButton';

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
  p: '80px',
};

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
        <Grid container columnSpacing={6}>
          <Grid item xs={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
              }}
              alt="Banner image"
              src={banner}
            />
          </Grid>
          <Grid item xs={6} sx={{ pt: '10px' }}>
            <Typography variant="h3">
              Discover endless possibilities with our Signature Service
            </Typography>
            <Typography
              variant="body1"
              sx={{ my: 4, textAlign: 'justify', color: 'primary.light' }}
            >
              Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad,
              nam no suscipit quaerendum. At nam minimum ponderum. Est audiam
              animal molestiae te. Ex duo eripuit mentitum.
            </Typography>
            <Box component="form" sx={{ display: 'flex' }}>
              <TextField
                id="email-text-field"
                label="Enter your email"
                sx={{ height: '3.5rem', flexGrow: 1, mr: { sm: 1, lg: 2 } }}
                name="email"
                variant="filled"
                color="secondary"
                // inputRef={ref}
              ></TextField>
              <LoadingButton
                variant="contained"
                // loading={isLoading}
                type="submit"
                color="secondary"
                sx={{ height: '3.5rem', width: '10rem' }}
                disableElevation={true}
              >
                Contact us*
              </LoadingButton>
            </Box>
            <Typography variant="body2" color="primary.light">
              *By clicking “Contact us” you are accepting ipsum dolor sit amet,
              sit ea brute mediocritatem, eu sed aliquam scripserit dissentiunt.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default LearnMoreModal;
