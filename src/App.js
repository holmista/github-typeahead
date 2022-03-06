import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import InputField from "./Input";
import Loading from "./Loading";
import Error from "./Error";
import Button from "./Button";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const page = useRef(2);
  let timeout1 = useRef(null);


  const fetchData = async (filter, page = 1) => {
    if (filter === "") return;
    try {
      const perPage = 1;
      const res = await axios.get(
        `https://api.github.com/search/users?q=${filter}+in%3Alogin&page=${page}&per_page=${perPage}`
      );
      setLoading(false);
      return res.data.items;
    } catch (e) {
      if (e.message.includes("403") && error === "")
        setError("too many requests");
      else if (e.message.includes("404") && error === "") setError("not found");
      else if (error === "") setError("unknown error occurred");
      setTimeout(() => {
        setError("");
      }, 2500);
      setLoading(false);
    }
  };

  useEffect(() => {
    if(loading){
      clearTimeout(timeout1.current);
    }
    const timeOut = setTimeout(async () => {
      if (filter) {
        const users = await fetchData(filter);
        setUsers(users);
      }
    }, 4000);
    return () => {
      clearTimeout(timeOut);
      console.log(loading)
      if(loading){
        clearTimeout(timeout1);
      } 
    };
  }, [filter]);

  const handleFilter = (e) => {
    setTimeout(() => {
      setFilter(e.target.value);
      setLoading(true);
      setUsers([]);
    }, 2000);
  };

  const handleLoad = () => {
    setLoading(true);
    timeout1.current = setTimeout(async () => {
      const res = await fetchData(filter, page.current);
      setUsers([...users, ...res]);
      page.current += 1;
    }, 6000);
  };

  return (
    <div className="parent">
      {error ? <Error errorMessage={error} /> : <></>}
      <InputField onChange={(e) => handleFilter(e)} />

      <div className="people">
        {users ? (
          users.map(({ login, avatar_url, html_url }) => {
            return (
              <SearchResult
                key={login}
                name={login}
                url={avatar_url}
                githubUrl={html_url}
              />
            );
          })
        ) : (
          <div></div>
        )}
        {users.length > 0 && loading === false ? (
          <Button onClick={handleLoad} />
        ) : (
          <></>
        )}
        {loading ? <Loading filter={filter} /> : <></>}
      </div>
    </div>
  );
}
