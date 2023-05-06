import { Alert, Box, Button, FormControl, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

function LoginForm({ login }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');

  const validateField = (fieldName, value) => {
    // eslint-disable-next-line
    switch(fieldName) {
      case 'username':
        if (!value.trim()) {
          return 'Username is required';
        }
        break;
      case 'password':
        if (!value.trim()) {
          return 'Password is required';
        }
        if (value.length < 8) {
          return 'Password must be at least 8 characters';
        }
        break;
    }
  };

  const validateForm = () => {
    const errors = {};

    errors.username = validateField('username', formData.username);
    errors.password = validateField('password', formData.password);

    setFormErrors(errors);

    return !(errors.username && errors.password);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setFormErrors({
      ...formErrors,
      [event.target.name]: validateField(event.target.name, event.target.value),
    });
  };

  const handleSubmit = async (event) => {
    if (validateForm()) {
      try {
        setFormData({
          'username': '',
          'password': ''
        });
        await login(formData.username, formData.password);
      } catch (error) {
        if (error.response.status === 401) {
          const errorMessage = error.response.data.error;
          setError(errorMessage);
        }
      }
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Paper style={{ width: 300, padding: '10px 20px 10px 10px', margin: '20px auto' }}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="username"
              label="Username"
              name="username"
              variant="standard"
              value={formData.username}
              error={!!formErrors.username}
              helperText={formErrors.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="password"
              type="password"
              label="Password"
              name="password"
              variant="standard"
              value={formData.password}
              error={!!formErrors.password}
              helperText={formErrors.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Button disabled={formErrors.username || formErrors.password} variant="contained" onClick={handleSubmit}>Sign In</Button>
          </FormControl>
          {error && <FormControl fullWidth sx={{ m: 1 }}>
            <Alert severity="error">{error}</Alert>
          </FormControl>}
        </Paper>
      </Box>
    </>
  );
}

export default LoginForm;
