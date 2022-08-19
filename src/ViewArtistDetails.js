import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col,Card } from 'react-bootstrap';
import Tracklist from './Tracklist'
import Albums from './Albums';
import axios from 'axios';
import { loadTopTracks } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import getStoredData from './logic/getStoredData'
import { ToastContext } from './context/toast';

function ViewArtistDetails(props) {
  const [show, setShow] = useState(false);
  const { name, picture, nb_fan } = props
  const mem = useSelector(state => state)
  const effectRan = useRef(0)
  const topTrack = mem.topTracks
  const [handleToastDisplay, setHandleToastDisplay] = useContext(ToastContext)

  const [details, setDetails] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { id } = props;
  const detailz = []

  const data = getStoredData(topTrack, id)




  useEffect(() => {
    if (effectRan.current == 0) {

      const fetchData = async () => {



        let odata = []

        console.log(data.length)
        if (data.length == 0) {

          try {

            const result = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/top?limit=5`)


            if (result.status == 200) {
              const response = await result.data.data
              await response != null && response.map((item) => {
                if (item != null) {
                  const { title_short, duration, rank, album } = item
                  detailz.push({ title_short, duration, rank, album })
                  data[id] = detailz

                }
              })

              dispatch(loadTopTracks(data))

              odata = data[id]
            }
            odata = await data
            setDetails(odata)


          }
          catch (ex) {
            setHandleToastDisplay(true)
          }


        }
      }



      fetchData()


    }
    return () => {
      effectRan.current = 1
    }
  }, [])

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        View Details
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body className="show-grid">

          <Row>

            <Col xs={4} md={4}>
              <Card >
                <Card.Img variant="top" style={{ width: '216px' }} src={picture} />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>
                    {`${nb_fan} fans`}
                  </Card.Text>



                </Card.Body>

              </Card>
            </Col>
            <Col xs={8} md={8} >
              {details[id] != undefined && <Tracklist dt={details[id]} />}
            </Col>


          </Row>
          <Col xs={12} md={12}>
            {details[id] != undefined && <Albums dt={details[id]} />}
          </Col>
        </Modal.Body>

      </Modal>
    </div>
  );
}

export default ViewArtistDetails;