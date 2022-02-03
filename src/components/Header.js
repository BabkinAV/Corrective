import React from 'react';
import { useState, useEffect } from 'react';

//MUI stuff
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@emotion/react';
import useViewport from '../hooks/useViewport';

const Header = ({ setSignInOpen, authenticated, setLogout, setSignUpOpen, username }) => {
  const [higlightedItem, setHighlightedItem] = useState('Login');
  const { width } = useViewport();
  const [collapsed, setCollapsed] = useState((width > 900) ? true : false);
  const theme = useTheme();


  useEffect(()=>{
    if (width < 900) {
      setCollapsed(false)
    }  else {
      setCollapsed(true)
    }
  }, [width]);
  

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: `background.secondary`,
        borderBottom: `1px solid ${theme.palette.primary.lighter}`,
      }}
      elevation={0}
    >
      <Toolbar sx={{ py: { xs: 2, md: 0 } }}>
      <Collapse in={collapsed} collapsedSize='30px' component={Box} sx={{width: '100%', '& .MuiCollapse-wrapperInner':
           { display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: '16px', md: 0 },
            minHeight: '96px',
            position: 'relative'}
          }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            disableRipple
            disableFocusRipple
            onClick={()=>{setCollapsed(!collapsed)}}
            aria-label="menu"
            sx={{ mr: 'auto', position: 'absolute', color: (theme) => theme.palette.primary.main, left: '1rem', top: '-0.75rem', display: { md: 'none', xs: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 500 }}
            color="secondary"
          >
            Corrective
          </Typography>
          <Box>
            <Button variant="text" sx={{ mx: 2 }} color="primary" disableRipple>
              Home
            </Button>
            <Button variant="text" sx={{ mx: 2 }} color="primary" disableRipple>
              About
            </Button>
            <Button variant="text" sx={{ mx: 2 }} color="primary" disableRipple>
              Contact
            </Button>
          </Box>
          <Box>
            {authenticated ? (
              <>
                <Typography sx={{display: 'inline-block', pr: 5}}>Hello, {username}!!!</Typography>
                <Button
                  variant="contained"
                  disableElevation
                  color="secondary"
                  onClick={setLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="secondary"
                  onClick={setSignUpOpen}
                  variant={higlightedItem === 'Signup' ? 'contained' : 'text'}
                  disableElevation={true}
                  onMouseOver={() => setHighlightedItem('Signup')}
                  onMouseLeave={() => setHighlightedItem('Login')}
                  sx={{ mr: 2 }}
                >
                  Signup
                </Button>
                <Button
                  variant={higlightedItem === 'Login' ? 'contained' : 'text'}
                  disableElevation={true}
                  color="secondary"
                  onClick={setSignInOpen}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Collapse>
      </Toolbar>
    </AppBar>
  );
};

export default Header;