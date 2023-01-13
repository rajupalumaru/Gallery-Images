import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Gallery from './Gallery';
function App() {

  const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const ChangeHandler = (e) => {
    setSearch(e.target.value);
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => setData(response.data.photos.photo));
    setData("");
  }

  return (
    <div>
      <center>
        <h2>Gallery Snapshots</h2>
        <form onSubmit={HandleSubmit}>
          <input type='text' value={search} onChange={ChangeHandler} /><br /><br />
          <input type='submit' name='search' />
        </form>
        {data.length > 1 ? <Gallery data={data}/> : <h4>No Data Loading</h4>}
      </center>
    </div>
  );
}

export default App; 
