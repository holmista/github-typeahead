import Avatar from '@mui/material/Avatar';

export default function SearchResult({name, url, githubUrl}) {
  return (
    <div onClick={()=>window.open(githubUrl)} className='card'>
        <div className="container">
          {name}
        </div>
        <Avatar
        src={url}
        alt={name}
        sx={{ width: 50, height: 50 }}
      />
    </div>
  );
}

