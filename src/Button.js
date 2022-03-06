import Buttonm from '@mui/material/Button';

export default function Button({onClick, disabled}) {
  return (
      <div className='loadmore'>
    <Buttonm variant="contained" onClick={onClick} disabled={disabled}>load more</Buttonm>

      </div>
  )
}
