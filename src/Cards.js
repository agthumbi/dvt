import Card from 'react-bootstrap/Card';
import ViewArtistDetails from './ViewArtistDetails'

function Cards(props) {
  
  const{name,picture,nb_fan}=props
  return (
  
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={picture} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
         {`${nb_fan} fans`}
        </Card.Text>
        <Card.Text>
        <ViewArtistDetails {...props}/>
        </Card.Text>

        
      </Card.Body>
  
    </Card>
  );
}

export default Cards;