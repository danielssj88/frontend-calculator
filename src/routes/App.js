import React, { useEffect, useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MasterTemplate from '../components/MasterTemplate';
import packageJson from '../../package.json';
import Home from '../containers/Home';
import UserRecords from '../containers/UserRecords';
import axios from 'axios';
import LoginForm from '../containers/LoginForm';
import serviceCaller from '../services/serviceCaller';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('access_token'));
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${packageJson.services_url}/login`, { username, password }, { withCredentials: true });
      // Save the token to local storage
      localStorage.setItem('access_token', response.data.access_token);
      setLoggedIn(true);
    }
    catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setLoggedIn(false);
    // Remove the access token from localStorage
    localStorage.removeItem('access_token');
    // Reload the page to clear the state
    window.location.reload();
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MasterTemplate logout={logout} ></MasterTemplate>,
      children: [
        {
          path: "/",
          element: ( loggedIn ? <Home /> : <Navigate to='/login' /> ),
        },
        {
          path: "/login",
          element: ( loggedIn ? <Navigate to='/' /> : <LoginForm login={login} /> )
        },
        {
          path: "/user-records",
          element: ( loggedIn ? <Navigate to='/' /> : <UserRecords login={login} /> )
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
