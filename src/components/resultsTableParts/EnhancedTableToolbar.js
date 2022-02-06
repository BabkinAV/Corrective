import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useViewport from '../../hooks/useViewport';
import {connect} from 'react-redux';

//custom components
import SelectStatus from './SelectStatus';

import { alpha } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import SaveIcon from '@mui/icons-material/SaveAs';
import CancelIcon from '@mui/icons-material/Cancel';

const EnhancedTableToolbar = (props) => {
  const { numSelected, onButtonClicked, statusUpdateLoading} = props;

  const [selectStatus, setSelectStatus] = useState(null);

  const handleSelectStatus = (status) => {
    setSelectStatus(status);
  };
  //Ensuring selectStatus equal to null after Toolbar is hidden
  useEffect(() => {
    if (numSelected === 0) setSelectStatus(null);
  }, [numSelected]);

  const { width } = useViewport();

  return (<>
    {(numSelected > 0 || width > 900) && ( <Toolbar
      sx={{
        minHeight: '128px',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} items selected
        </Typography>
      )}

      {numSelected > 0 && (
        <Box
          sx={{
            display: 'flex',
            width: {md:'40rem'},
            justifyContent: 'space-between',
            flexDirection: {xs: 'column-reverse', md: 'row'},
            height: {xs: '135.5px', md: 'auto'},
            alignItems: {xs: 'center', md: 'unset'}
          }}
        >
          <SelectStatus onStatusSelect={handleSelectStatus} select />
          <Box sx={{ display: 'flex', minHeight: {xs: '3.5rem', md: 'auto'}, ml: {xs: '0', md: '1rem', lg: 'auto'}, mb: {xs: '1rem', md: 'unset'} }}>
            <LoadingButton
              variant="outlined"
              color="success"
              loading={statusUpdateLoading}
              disabled={!selectStatus}
              onClick={() => {
                onButtonClicked('SAVE', selectStatus);
              }}
              startIcon={<SaveIcon />}
              sx={{ mr: '1rem' }}
            >
              Save
            </LoadingButton>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              disabled={statusUpdateLoading}
              onClick={() => {
                onButtonClicked('CANCEL');
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Toolbar>)}
    </>
  );
};

const mapStateToProps = state => {
  return {
    statusUpdateLoading : state.ui.statusUpdateLoading,
  }
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(EnhancedTableToolbar);
