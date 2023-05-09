import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

function RecordList({ records }) {
  const columns = [
    { field: 'statement', headerName: 'Operation', width: 120,
      valueGetter: (params) => params.row.operation_response.stmt
    },
    { field: 'response', headerName: 'Response', width: 120,
      valueGetter: (params) => params.row.operation_response.res
    },
    { field: 'operation', headerName: 'Type', width: 120 },
    { field: 'amount', headerName: 'Amount', type: 'number',
      valueGetter: (params) => params.row.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    { field: 'user_balance', headerName: 'User Balance', width: 120,
      valueGetter: (params) => params.row.user_balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    { field: 'date', headerName: 'Date', width: 240 }
  ];

  return (
    <div className='layout-column align-items-center justify-content-start'>
      {records.length === 0
        ? <p data-testid='no-results'>No Results Found!</p>
        : 
        <DataGrid
          rows={records}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      }
    </div>
  )
}

export default RecordList;