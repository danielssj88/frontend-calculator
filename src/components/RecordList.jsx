import React from 'react'

function RecordList({ records }) {
  return (
    <div className='layout-column align-items-center justify-content-start'>
      {records.length === 0
        ? <p data-testid='no-results'>No Results Found!</p>
        : <div className='card w-40 pt-30 pb-8 mt-20'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Location</th>
                  <th>Gender</th>
                  <th>Income</th>
                </tr>
              </thead>
              <tbody data-testid='searched-records'>
                {records.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td>{record.name}</td>
                      <td>{record.age}</td>
                      <td>{record.location}</td>
                      <td>{record.gender}</td>
                      <td>{record.income}</td>
                    </tr>
                )})}
              </tbody>
            </table>
          </div>
      }
    </div>
  )
}

export default RecordList;