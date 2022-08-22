import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import Cards from './Cards';
import { useDispatch, useSelector } from 'react-redux';
import { loadDefaultArtist } from './reducer';
import { ToastContext } from './context/toast';


function Main() {

  const effectRan = useRef(false)
  const dispatch = useDispatch();
  const mem = useSelector(state => state)
  const [handleToastDisplay, setHandleToastDisplay] = useContext(ToastContext)
  const [details, setDetails] = useState(mem.defaultArtist)








  const fetchData = async () => {


    let detailz = []
    try {

      for (let i = 1; i < 4; i++) {

        const result = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${i}`)


        var { name, picture, nb_fan, tracklist, id } = await result.data

        if (result.status == 200)
          detailz.push({ name, picture, nb_fan, tracklist, id })


      }
      setDetails(detailz)
      dispatch(loadDefaultArtist(detailz))
    } catch (ex) {
      setHandleToastDisplay(true)
    }

  }
  useEffect(() => {



      if (details.length == 0)
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

export default Main;
