import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const withAuth = (WrappedComponent) => {
  const HOC = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await Auth.currentAuthenticatedUser();
          setAuthenticated(true);
        } catch (error) {
          console.log('error: ', error);
        }
        setLoading(false);
      };
      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
        <Route
          render={() =>
            authenticated ? (
              <WrappedComponent />
            ) : (
              <Navigate to={{ pathname: '/login' }} />
            )
          }
        />
      </Router>
    );
  };
  return HOC;
};

export default withAuth;
