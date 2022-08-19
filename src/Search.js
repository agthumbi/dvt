import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';

import { loadSearchArtist } from './reducer';

function Search() {
  const mem = useSelector(state => state)
  const [search, setSearch] = useState(mem.searchArtist)
  const dispatch = useDispatch()
  const handleSearch = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    let values = {}
    for (let [key, value] of data.entries())
      values[key] = value

    const result = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${values['search']}`)
    const response = await result.data.data

    const hash = Object.create(null);
    const res = await response.filter((a) => {
      var key = JSON.stringify(a.artist.id);
      hash[key] = (hash[key] || 0) + 1;
      return hash[key] == 1

    })

    setSearch(res)
    dispatch(loadSearchArtist(res))
    window.location.href = '/search';
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#genre">Genre</Nav.Link>
            <Nav.Link href="#genre">Playlist</Nav.Link>
            <NavDropdown title="Songs" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#songs">Albums</NavDropdown.Item>
              <NavDropdown.Item href="#playlist">
                Playlist
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#artists">
                Artist
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Report spam
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              name="search"
              className="me-2"
              aria-label="Search Artist"
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Search;