import {useState, useEffect} from 'react'
import axios from 'axios'
import SearchResult from './SearchResult'
import InputField from './Input'
import Loading from './Loading'
import Error from './Error'

export default function App() {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = async(filter, updateFunc)=>{
    if (filter==='') return 
    try{
      const page=1
      const perPage=100
      const {data} = await axios.get(`https://api.github.com/search/users?q=${filter}+in%3Alogin&page=${page}&per_page=${perPage}`)
      updateFunc(data.items)
      setLoading(false)
    }catch(e){
      setLoading(false)
    }
  }

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      if(filter) {
        fetchData(filter, setUsers)
      }
    },6000)
    return ()=>clearTimeout(timeOut)
  },[filter])

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      if(filter) {
        setFilter(filter)
        setLoading(true)
        setUsers([])
      }
    }, 1200)
    return ()=>clearTimeout(timeOut)
  },[filter])

  return (

    <div className='parent'>
      <Error errorMessage={"couldn't get data"}/>
      <InputField value={filter} onChange={(e)=>setFilter(e.target.value)}/>
      {loading?<Loading filter={filter}/>:<></>}
      <div className='people'>
      {users?users.map(({login, avatar_url})=>{
        return(
          <SearchResult name={login} url={avatar_url}/>

        )
      }):<div></div>}

      </div>

    </div>
  )
}
