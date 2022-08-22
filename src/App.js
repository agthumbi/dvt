
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"; import Main from './Main';
import Search from './Search';
import SearchedArtists from './SearchedArtists'
import Toast from 'react-bootstrap/Toast';
import { ToastContext } from './context/toast';
import { useContext } from 'react';
function App() {


  const [handleToastDisplay, setHandleToastDisplay] = useContext(ToastContext)

  return (<div>
    <Toast onClose={() => setHandleToastDisplay(false)} show={handleToastDisplay} delay={3000} >
      <Toast.Header>
        <img
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto" style={{ color: 'red' }}>Notification</strong>
        <small>alert!</small>
      </Toast.Header>
      <Toast.Body>Error Retrieving information</Toast.Body>
    </Toast>
    <Search />
    <BrowserRouter>
      <Routes>
        <Route path='/search' element={<SearchedArtists />} />
        <Route path="/" element={<Main />}>



        </Route>
      </Routes>
    </BrowserRouter>




  </div>);
}

export default App;
