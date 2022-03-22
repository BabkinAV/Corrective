import React, { useCallback, useRef, forwardRef } from 'react';
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

//actions
import {
  setAuthenticated,
  setShowSnackBar,
  setIsLoading
} from './redux/actions/uiActions';
import {
  setSelected,
  setRows,
  setUnitNo
} from './redux/actions/dataActions';

//mui stuff
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const api_key = process.env.REACT_APP_GOOGLE_API_KEY;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// let unitNo = 'B7NZ1111'

const App = ({
  authenticated,
  setAuthenticated,
  setSelected,
  setRows,
  rows,
  showSnackbar,
  setShowSnackBar,
  unitNo,
  setUnitNo,
  setIsLoading
}) => {
  const unitNoInputRef = useRef();
  const firstLoad = useRef(true);

  // const [isLoading, setIsLoading] = useState(false);
  const [foundUnit, setFoundUnit] = useState(true);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [username, setUsername] = useState('');

  const fetchInstructionsHandler = useCallback(() => {
    !firstLoad.current && setIsLoading(true);

    let inputNoObtained = firstLoad.current
      ? 'B7NZ1111'
      : unitNoInputRef.current.value.toUpperCase();

    setUnitNo(inputNoObtained);
    axios
      .get(
        `https://europe-west1-corrective-afe97.cloudfunctions.net/api/unit/${inputNoObtained}`
      )
      .then((response) => {
        const myData = response.data;
        if (myData.length > 0) {
          setRows(myData);
          setFoundUnit(true);
        } else {
          setFoundUnit(false);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [firstLoad, setRows, setUnitNo, setIsLoading]);

  useEffect(() => {
    fetchInstructionsHandler();
    firstLoad.current = false;
  }, [fetchInstructionsHandler]);

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

  useEffect(() => {
    if (authenticated) {
      const idToken = localStorage.FBIdToken.split('bearer ')[1];
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`,
          {
            idToken,
          }
        )
        .then((response) => {
          setUsername(response.data.users[0].displayName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [authenticated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.docId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


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
        username={username}
      />
      <main>
        <Hero />
        <UnitSearch
          fetchInstructionsHandler={fetchInstructionsHandler}
          ref={unitNoInputRef}
        />
        <ResultsTable
          unitNo={unitNo}
          handleSelectAllClick={handleSelectAllClick}
          foundUnit={foundUnit}
        />
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
    unitNo: state.data.unitNo
  };
};

const mapDispatchToProps = {
  setAuthenticated,
  setSelected,
  setRows,
  setShowSnackBar,
  setUnitNo,
  setIsLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
