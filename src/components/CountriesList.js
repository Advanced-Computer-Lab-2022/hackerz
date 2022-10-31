import React from 'react'
import Country from './Country'
import {ListGroup} from 'react-bootstrap';  


export default function CountriesList({countries}) {

    return (
        <div>
        <ListGroup>
        { Object.keys(countries).map(country => {
            return <Country key={country} country={country}/>
        }) }
        </ListGroup>
        </div>
        
  )
}
