import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {
  toast_loginError,
  toast_loginSuccess,
  toast_logoutSuccess,
} from '../utils/toasts';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const intialValues = { username: '', password: '' };
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies('user');
  const [formValues, setFormValues] = useState(intialValues);
  const [validUsers, setValidUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') || false
  );

  const getUsersList = () => {
    const host = `https://api.airtable.com/`;
    const token = 'Bearer keyfXgn8PL6pB3x32';
    (async function () {
      try {
        const response = await axios.get(
          `${host}v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setValidUsers(response.data.records);
      } catch (error) {
        console.error('ERROR', error);
      }
    })();
  };

  const loginHandler = () => {
    const matchFound = validUsers.find(
      (user) =>
        user.fields.username === formValues.username &&
        user.fields.password === formValues.password
    );

    if (matchFound) {
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      setIsLoggedIn(true);
      navigate('/home');
      setFormValues(intialValues);
      toast_loginSuccess();
    } else {
      toast_loginError();
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
    toast_logoutSuccess();
    removeCookie('liked');
    removeCookie('bookMark');
    removeCookie('restaurant');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        formValues,
        cookies,
        getUsersList,
        loginHandler,
        setFormValues,
        setCookie,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
