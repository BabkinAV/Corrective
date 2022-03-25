import React from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { fetchInstructionsHandler } from '../redux/actions/dataActions';

import LoadingButton from '@mui/lab/LoadingButton';

const UnitSearch = React.forwardRef(
  ({ fetchInstructionsHandler, isLoading }, ref) => {
    const onSubmitHandler = (event) => {
      event.preventDefault();

      const unitno = (event.target.unitno);
      
      fetchInstructionsHandler( false, unitno);
    };

    return (
      <Grid
        container
        columnSpacing={{ xs: 0, md: 1, lg: 2 }}
        rowSpacing={1}
        sx={{ px: { xs: 1, sm: 4 }, my: 3 }}
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={6}
          lg={5}
          xl={4}
          sx={{ display: 'flex' }}
          component="form"
          onSubmit={onSubmitHandler}
        >
          <TextField
            id="unit-text-field"
            label="Serial no..."
            sx={{ height: '3.5rem', flexGrow: 1, mr: { sm: 1, lg: 2 } }}
            name="unitno"
            variant="filled"
            color="secondary"
            inputRef={ref}
          ></TextField>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            type="submit"
            color="secondary"
            sx={{ height: '3.5rem', width: '10rem' }}
            disableElevation={true}
          >
            Check your product*
          </LoadingButton>
        </Grid>
        <Grid item xs={12} sm={9} md={5}>
          <Typography variant="body2" color="primary.light">
            *By clicking “Check your product” you are accepting ipsum dolor sit
            amet, sit ea brute mediocritatem, eu sed aliquam scripserit
            dissentiunt.
          </Typography>
        </Grid>
      </Grid>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = {
  fetchInstructionsHandler,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(UnitSearch);
