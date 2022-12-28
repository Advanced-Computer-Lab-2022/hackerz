import React from 'react'
import './PopUp.css'
import Button from 'react-bootstrap/Button';

export default function PopUp(props) {
  
  return (props.trigger) ? ( 
    <div className='popup'>
      <div className='popup-inner'>
      <h3>Company's Contract</h3>
        <p>The company owns all the rights to the posted videos and materials.</p>
        <p> the company takes 12% of all the revenues of the sold courses.</p>
        <Button onClick={() => props.setTrigger(false)} className="accept-btn w-25 mx-auto mb-3" variant="primary">Close</Button>
        {/* {props.children} */}
      </div>
    </div>
  ) : "";
}
