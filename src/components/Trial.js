import React, { useState } from 'react';
import Signup  from "./Signup.js";

const Trial = () => {
    
    const [showModal, setShowModal] = useState(false);
    const toggleModal = ()=>
    {
        if(showModal)
        {
        setShowModal(false);
        }
        else
        {
            setShowModal(true);
        }
    } 

  return (
      <>
    <div>
                <button onClick={ toggleModal } >
                    Open Modal
                </button>
                <Signup isOpen={showModal} toggle={toggleModal} />
            </div>
            </>
  )
}

export default Trial