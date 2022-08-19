import { useEffect, useState } from 'react';
import {CardGroup,Card} from 'react-bootstrap';

function Albums(props) {
  const [data,setData]=useState([])

  const FetchData=async()=>{
   
      const datas=await props.dt;
  setData(datas)
  }

useEffect(()=>{
  FetchData()
 
},[])
  return (
    
    <div>
      <br/>
      <br/>
       <label style={{fontWeight:500,display:'block'}}>Albums</label>
       <br/>
     <CardGroup>
    
        {data!=null && data.map((item)=>
     <Card>
       <Card.Img variant="top" src={item.album.cover} />
       <Card.Body>
         <Card.Title>{item.album.title}</Card.Title>
        
       </Card.Body>
       <Card.Footer>
         <small className="text-muted">2022</small>
       </Card.Footer>
     </Card>
        )}
     
   </CardGroup>
   </div>
  );
}

export default Albums;