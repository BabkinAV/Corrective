import React, { useRef, forwardRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';

//coponents
import Header from './components/Header';
import Hero from './components/Hero';
import UnitSearch from './components/UnitSearch';
import ResultsTable from './components/ResultsTable';
import SignIn from './components/forms/SignIn';
import SignUp from './components/forms/SignUp';
import Footer from './components/Footer';
import LearnMoreModal from './components/modals/LearnMoreModal';
import AboutModal from './components/modals/AboutModal';

//actions
import { setAuthenticated, setShowSnackBar } from './redux/actions/uiActions';
import {
  setSelected,
  setUsername,
  fetchInstructionsHandler,
  fetchUserName,
} from './redux/actions/dataActions';

//mui stuff
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const api_key = process.env.REACT_APP_GOOGLE_API_KEY;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = ({
  authenticated,
  setAuthenticated,
  setSelected,
  showSnackbar,
  setShowSnackBar,
  setUsername,
  fetchInstructionsHandler,
  fetchUserName,
}) => {
  const unitNoInputRef = useRef().current;

  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  //fetch instructions for default unit on first load
  useEffect(() => {
    fetchInstructionsHandler(true, unitNoInputRef);
  }, [fetchInstructionsHandler, unitNoInputRef]);

  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 > Date.now()) {
        axios.defaults.headers.common['Authorization'] = token;
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }
  }, [setAuthenticated]);

  //obtaining user name on auth state change
  useEffect(() => {
    fetchUserName(authenticated, api_key);
  }, [authenticated, fetchUserName]);

  const setAuthorizationHeader = (token) => {
    const FBIdToken = `bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };

  const AuthTokenObtainedHandler = (idToken) => {
    setAuthorizationHeader(idToken);
    setAuthenticated(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    setAuthenticated(false);
    setSelected([]);
    setUsername('');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackBar((prevState) => {
      return { ...prevState, show: false };
    });
  };

  return (
    <>
      <Header
        setSignInOpen={() => setSignInOpen(true)}
        setSignUpOpen={() => setSignUpOpen(true)}
        setLogout={logoutHandler}
      />
      <main>
        <Hero />
        <UnitSearch ref={unitNoInputRef} />
        <ResultsTable />
      </main>
      <Footer />
      <SignIn
        signInOpen={signInOpen}
        setSignInClose={() => setSignInOpen(false)}
        onAuthTokenObtained={AuthTokenObtainedHandler}
      />
      <SignUp
        signUpOpen={signUpOpen}
        setSignUpClose={() => setSignUpOpen(false)}
        onAuthTokenObtained={AuthTokenObtainedHandler}
      />
      <LearnMoreModal />
      <AboutModal />
      <Snackbar
        open={showSnackbar.show}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={showSnackbar.severity}>
          {showSnackbar.severity === 'success' && 'Save success'}
          {showSnackbar.severity === 'error' && 'Something went wrong'}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.ui.authenticated,
    showSnackbar: state.ui.showSnackbar,
    selected: state.data.selected,
    rows: state.data.rows,
  };
};

const mapDispatchToProps = {
  setAuthenticated,
  setSelected,
  setShowSnackBar,
  setUsername,
  fetchInstructionsHandler,
  fetchUserName,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
