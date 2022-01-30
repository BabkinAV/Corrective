import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ minHeight: '7rem', bgcolor: `background.secondary`, py: 2, px: 3.5, mt: 'auto' }} component="footer">
      <Box sx={{ maxWidth: '30rem' }}>
        <Typography variant="body1" sx={{ color: 'primary.light'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
        <Typography variant="body1"  sx={{ color: 'primary.light'}}>
           Copyright &copy; Andrey Babkin 2021-{new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
