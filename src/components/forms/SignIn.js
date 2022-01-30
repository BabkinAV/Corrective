import * as React from 'react';
import axios from 'axios';
import { useReducer, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import { TextField, Typography } from '@mui/material';
import { Grid, Box } from '@mui/material';


//form validation
import {
  UPDATE_FORM,
  RESET_FORM,
  onInputChange,
  onFocusOut,
  validateInput,
} from '../../helpers/formUtils';

const api_key=process.env.REACT_APP_GOOGLE_API_KEY;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, px: 2, py: { xs: 0.5, md: 2 } }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const initialState = {
  email: { value: '', touched: false, hasError: true, error: '' },

  password: { value: '', touched: false, hasError: true, error: '' },

  isFormValid: false,

  isFormInvalidMessage: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;

      return {
        ...state,

        // update the state of the particular field,

        // by retaining the state of other fields

        [name]: { ...state[name], value, hasError, error, touched },

        isFormValid,
      };

    case RESET_FORM: {
      return initialState;
    }

    default:
      return state;
  }
};

//************************Main component******************* */

const SignIn = ({ signInOpen, setSignInClose, onAuthTokenObtained }) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const [showError, setShowError] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  const signInSubmitHandler = (event) => {
    event.preventDefault();
    //********FORM LEVEL VALIDATION********************** */
    let isFormValid = true;

    for (const name in formState) {
      const item = formState[name];
      const { value } = item;
      const { hasError, error } = validateInput(name, value);
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        });
      }
    }

    if (!isFormValid) {
      setShowError(true);
    } else {
      //Logic to submit the form to backend
      const { email, password } = event.currentTarget.elements;
      setSignInLoading(true);
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`,
          {
            email: email.value,
            password: password.value,
            returnSecureToken: true,
          }
        )
        .then((response) => {
          setSignInLoading(false);
          const myData = response.data;
          onAuthTokenObtained(myData.idToken);
          dispatch({ type: 'RESET_FORM' });
          setShowError(false);
          setSignInClose();
        })
        .catch((error) => {
          // handle error
          setSignInLoading(false);
          console.log(error);
          if (error.response.data.error.message === 'EMAIL_NOT_FOUND') {
            setBackendError('Email not found');
          } else if (error.response.data.error.message === 'INVALID_PASSWORD') {
            setBackendError('Incorrect password');
          } else {
            setBackendError('Something went wrong');
          }

          
          setTimeout(() => {
            setBackendError('');
          }, 5000);
        });
    }
  };

  const handleClose = () => {
    setShowError(false);
    dispatch({ type: 'RESET_FORM' });
    setSignInClose();
  };

useEffect(() => {
    dispatch({ type: 'RESET_FORM' });
  
  }, [setSignInClose]);
  

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={signInOpen}
        sx={{ '& .MuiPaper-root': { margin: '5px' } }}
      >
        <Box component="form" onSubmit={signInSubmitHandler}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Log In
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <TextField
                id="email"
                label="Email"
                color="secondary"
                className="Authorization_Form_Field"
                sx={{ mb: 2, pb: 2, minWidth: { md: '20rem' } }}
                error={formState.email.touched && formState.email.hasError}
                helperText={
                  formState.email.touched &&
                  formState.email.hasError &&
                  formState.email.error
                }
                value={formState.email.value}
                onChange={(e) => {
                  onInputChange('email', e.target.value, dispatch, formState);
                }}
                onBlur={(e) => {
                  onFocusOut('email', e.target.value, dispatch, formState);
                }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                color="secondary"
                className="Authorization_Form_Field"
                sx={{ pb: 2, mb: 2, minWidth: { md: '20rem' } }}
                error={
                  formState.password.touched && formState.password.hasError
                }
                helperText={
                  formState.password.touched &&
                  formState.password.hasError &&
                  formState.password.error
                }
                value={formState.password.value}
                onChange={(e) => {
                  onInputChange(
                    'password',
                    e.target.value,
                    dispatch,
                    formState
                  );
                }}
                onBlur={(e) => {
                  onFocusOut('password', e.target.value, dispatch, formState);
                }}
              />
              {showError && !formState.isFormValid && (
                <Typography
                  sx={{
                    position: 'absolute',
                    bottom: '-1rem',
                    color: 'error.main',
                  }}
                >
                  Please fill in all the fields correctly
                </Typography>
              )}
              {backendError && (
                <Typography
                  sx={{
                    position: 'absolute',
                    bottom: '-1rem',
                    color: 'error.main',
                  }}
                >
                  {backendError}
                </Typography>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ d: 'flex', justifyContent: 'center' }}>
            <LoadingButton
              variant="contained"
              loading={signInLoading}
              color="secondary"
              disableElevation
              autoFocus
              type="submit"
            >
              Log In
            </LoadingButton>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
};

export default SignIn;
