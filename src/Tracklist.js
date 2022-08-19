
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { ListGroup } from 'react-bootstrap';

function Tracklist(props) {
  const [data, setData] = useState([])
  const FetchData = async () => {
    setData(props.dt)
  }
  useEffect(() => {
    FetchData()
  }, [])


  return (
    <ListGroup as="ol" numbered>
      <label>Top 5 Tracks</label>
      {data != null && data.map((item) =>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.title_short}</div>

          </div>
          <Badge bg="primary" pill>
            {item.duration}
          </Badge>
        </ListGroup.Item>
      )}

    </ListGroup>
  );
}

export default Tracklist;