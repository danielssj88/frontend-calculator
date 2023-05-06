import React, { useState } from 'react'
import RecordList from '../components/RecordList';

const List = [];

function UserRecords() {
  const [searchValue, setSearchValue] = useState('');
  const [records, setRecords] = useState(List);

  const searchInputChange = (event) => {
    setSearchValue(event.target.value);
    const searchText = event.target.value;
    if (searchText === '') {
	  setRecords(List);
      return;
    }
    setRecords(List.filter((customer) => {
      return customer.name.startsWith(searchText) ||
            customer.age.toString().startsWith(searchText) ||
            customer.location.startsWith(searchText) ||
            customer.gender.startsWith(searchText) ||
            customer.income.startsWith(searchText);
    }));
  };

  return (
    <>
      <div className='layout-row align-items-center justify-content-center mt-30'>
        <input className='large mx-20 w-20' data-testid='search-input' type='text' value={searchValue} placeholder='Enter search term (Eg: Phil)' onChange={searchInputChange} />
      </div>
      <RecordList records={records} />
    </>
  )
}

export default UserRecords