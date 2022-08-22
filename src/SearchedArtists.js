import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import Cards from './Cards';
import {  useSelector } from 'react-redux';

function SearchedArtist() {

  const effectRan = useRef(false)

  const mem = useSelector(state => state)
  const sArtist = mem.searchArtist;

  const [details, setDetails] = useState(sArtist)








  const fetchData = async () => {
    let detailz = []
    if (sArtist.length != 0) {
      for (let sh of sArtist) {
        const link = sh.artist.id

        const result = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${link}`)

      
        var { name, picture, nb_fan, tracklist, id } = result.data
        detailz.push({ name, picture, nb_fan, tracklist, id })
      }
     
      setDetails(detailz)
      console.log(details)
    }
  }
  
  useEffect(() => {


 

      
      fetchData()


   

  }, [])





  return (
    <div>
      

      {details.map((item) =>

        <Cards  {...item} />

      )}

    </div>

    
  );
}

export default SearchedArtist;
