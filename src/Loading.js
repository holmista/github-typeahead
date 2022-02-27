import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({filter}) {
  return (
    <div className='loading'>
      <div>searching for {filter}</div>
      <CircularProgress />
    </div>
  );
}
