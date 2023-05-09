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
import { useDispatch } from 'react-redux';
import { login, logout } from '../store/sessionSlice';
import { useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);

  // Check if user is logged in on mount
  /**
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('access_token'));
  }, []);
   */

  const loginHandler = async (username, password) => {
    try {
      const response = await axios.post(`${packageJson.services_url}/api/v1/login`, { username, password }, { withCredentials: true });
      // Save the token to local storage
      const accessToken = response.data.access_token;
      const currentBalance = response.data.current_balance;
      const user = { username, currentBalance, accessToken };
      dispatch(login(user));
    }
    catch (error) {
      throw error;
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MasterTemplate logout={logoutHandler} ></MasterTemplate>,
      children: [
        {
          path: "/",
          element: ( isLoggedIn ? <Home logout={logoutHandler} /> : <Navigate to='/login' /> ),
        },
        {
          path: "/login",
          element: ( isLoggedIn ? <Navigate to='/' /> : <LoginForm login={loginHandler} /> )
        },
        {
          path: "/user-records",
          element: ( isLoggedIn ? <UserRecords logout={logoutHandler} /> : <Navigate to='/login' /> )
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
