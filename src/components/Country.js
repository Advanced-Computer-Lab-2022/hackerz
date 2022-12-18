import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

/*function example(country){
    console.log(country);
}*/

var my_country = 'EG';

export default function Country({country}) {
  //const link = "/courses/" + course._id;
  //var my_country = 'EG';
  return (
    <ListGroup.Item action onClick={() => {
      my_country = country;
      console.log(my_country);
      }}>
        {country}
    </ListGroup.Item>
  )
}

export { my_country }
// export my_country;
//  style={{width:"20%"}} className="m-1"