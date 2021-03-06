import { Button, Typography } from '@mui/material';
//Redux stuff
import { connect } from 'react-redux';
import { setModalOpen } from '../redux/actions/uiActions';
//Mui stuff
import { Box } from '@mui/system';
import React from 'react';
import HeroImg from '../assets/img/hero.jpg';

function Hero({setModalOpen}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        px: 2,
        backgroundImage: (theme) =>
          `linear-gradient(0deg, ${theme.palette.background.ternary}, ${theme.palette.background.ternary}), url(${HeroImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '55rem',
          flexDirection: 'column',
          mt: '8rem',
        }}
      >
        <Typography variant="h1" sx={{ textAlign: 'center', my: 2 }}>
          Check your product for upgrades
        </Typography>
        <Typography
          variant="body1"
          sx={{ my: 4, textAlign: 'justify', color: 'primary.darker' }}
        >
          Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
          no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
          molestiae te.
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            '&, &:hover': {
              border: '2px solid',
            },
          }}
          onClick={() => setModalOpen(true)}
        >
          Learn more
        </Button>
      </Box>
    </Box>
  );
}

export default connect(null, {setModalOpen})(Hero);
