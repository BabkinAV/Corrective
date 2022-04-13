import React from 'react';

//Redux stuff
import { connect } from 'react-redux';
import { setModalOpen } from '../../redux/actions/uiActions';

//Mui stuff
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';

//extra dependencies
import banner from '../../assets/img/LearnMoreModal.jpg';

const modalStyle = {
  position: 'absolute',
  top: { xs: '5%', md: '10%' },
  left: '10%',
  right: '10%',
  minHeight: 400,
  outline: 0,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: {
    xs: '10px',
    lg: '80px',
  },
};

const LearnMoreModal = ({isModalOpen, setModalOpen}) => {

  return (
    <Modal
      open={isModalOpen}
      onClose={() =>setModalOpen(false)}
      aria-labelledby="contact-us"
      aria-describedby="learn-more-on-service"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={() =>setModalOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => ({ xs: '#fff', sm: theme.palette.grey[500] }),
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid
          container
          columnSpacing={{ xs: 0, md: 6 }}
          alignItems="center"
          sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
          <Grid item xs={12} sm={10} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
              }}
              alt="Banner image"
              src={banner}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ pt: '10px' }}>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.5rem', md: '1.75rem', lg: '2rem' } }}
            >
              Discover endless possibilities with our Signature Service
            </Typography>
            <Typography
              variant="body1"
              sx={{
                my: { xs: 1, md: 4 },
                textAlign: 'justify',
                color: 'primary.light',
                fontSize: { xs: '0.875rem', md: '1rem' },
              }}
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
            <Typography
              variant="body2"
              color="primary.light"
              sx={{
                fontSize: { xs: '0.6rem', md: '0.875rem' },
                lineHeight: 'unset',
              }}
            >
              *By clicking “Contact us” you are accepting ipsum dolor sit amet,
              sit ea brute mediocritatem, eu sed aliquam scripserit dissentiunt.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isModalOpen: state.ui.isModalOpen,
  }
}

export default connect(mapStateToProps, {setModalOpen})(LearnMoreModal);
