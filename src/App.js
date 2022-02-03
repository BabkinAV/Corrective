import React, { useCallback, useRef, forwardRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Header from './components/Header';
import Hero from './components/Hero';
import UnitSearch from './components/UnitSearch';
import ResultsTable from './components/ResultsTable';
import SignIn from './components/forms/SignIn';
import SignUp from './components/forms/SignUp';
import Footer from './components/Footer';

import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const api_key=process.env.REACT_APP_GOOGLE_API_KEY;


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// let unitNo = 'B7NZ1111'

const App = () => {
  const unitNoInputRef = useRef();
  const firstLoad = useRef(true);

  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unitNo, setUnitNo] = useState('B7NZ2222');
  const [foundUnit, setFoundUnit] = useState(true);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [showSnackbar, setShowSnackBar] = useState({show: false, severity: 'success'});

  const [authenticated, setAuthenticated] = useState(false);


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
  }, [firstLoad]);

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
  }, []);

  useEffect(()=>{
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
  }, [authenticated])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.docId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const onButtonClickedHandler = (type, status) => {
    if (type === 'SAVE') {
      if (selected.length > 0) {
        let arrayToSaveDb = selected.map((el) => ({
          docId: el,
          status: status,
        }));

        setStatusUpdateLoading(true);
        axios
          .patch(
            `https://europe-west1-corrective-afe97.cloudfunctions.net/api/updateunit/${unitNo}`,
            arrayToSaveDb
          )
          .then((response) => {
            setRows((prevState) => {
              return prevState.map((el) => {
                if (selected.indexOf(el.docId) !== -1) {
                  el.status = status;
                }
                return el;
              });
            });
            setSelected([]);
            setStatusUpdateLoading(false);
            setShowSnackBar({show: true, severity: 'success'});
          })
          .catch((error) => {
            // handle error
            setStatusUpdateLoading(false);
            setShowSnackBar({show: true, severity: 'error'});
            setSelected([]);
            console.log(error);
          });
        }
        
      } else if (type === 'CANCEL') {
        setSelected([]);
    }
    
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
    setUsername('');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackBar((prevState) => {return {...prevState, show: false}});
  };

  return (
    <>
      <Header
        setSignInOpen={() => setSignInOpen(true)}
        setSignUpOpen={() => setSignUpOpen(true)}
        authenticated={authenticated}
        setLogout={logoutHandler}
        username={username}
      />
      <main>
        <Hero />
        <UnitSearch
          fetchInstructionsHandler={fetchInstructionsHandler}
          isLoading={isLoading}
          ref={unitNoInputRef}
        />
        <ResultsTable
          rows={rows}
          unitNo={unitNo}
          onButtonClickedHandler={onButtonClickedHandler}
          handleSelectAllClick={handleSelectAllClick}
          handleClick={handleClick}
          selected={selected}
          foundUnit={foundUnit}
          authenticated={authenticated}
          statusUpdateLoading={statusUpdateLoading}
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
      <Snackbar open={showSnackbar.show} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={showSnackbar.severity}>
          
         {(showSnackbar.severity==='success') && ('Save success') } 
         {(showSnackbar.severity==='error') && ('Something went wrong') } 

        </Alert>
      </Snackbar>
    </>
  );
};

export default App;