import React, { useEffect, useState } from 'react'
import RecordList from '../components/RecordList';
import { useSelector } from 'react-redux';
import axios from 'axios';
import packageJson from '../../package.json';
import { FormControl, TextField } from '@mui/material';
import { Padding } from '@mui/icons-material';

const List = [];

function UserRecords({logout}) {
  const accessToken = useSelector((state) => state.session.accessToken);
  const [searchValue, setSearchValue] = useState('');
  const [records, setRecords] = useState(List);
  
  const fetchUserRecords = () => {
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };

    let url = `${packageJson.services_url}/api/v1/record`;
    if (searchValue !== '') {
      url = `${packageJson.services_url}/api/v1/record/${searchValue}`;
    }

    axios.get(url, { headers })
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        if (error.response.status === 405 || error.response.status === 401) {
          logout();
        }
        else {
          alert(JSON.stringify(error.response.data));
        }
      });
  };

  useEffect(() => {
    fetchUserRecords();
  }, [searchValue]);

  const searchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className='layout-row align-items-center justify-content-center mt-30'>
        <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
              id="searchValue"
              name="searchValue"
              variant="standard"
              value={searchValue}
              placeholder='Enter search term (Eg: division)'
              onChange={searchInputChange}
            />
          </FormControl>
      </div>
      <RecordList records={records} />
    </>
  )
}

export default UserRecords