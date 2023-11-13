import React,{ useState } from 'react'
import { Collapse } from 'react-bootstrap'

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <div className='card shadow p-5'>
      <div className='d-flex justify-content-between'>
        <h2> My Profile</h2>
        <button   onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-chevron-down fa-beat-fade"></i></button>
      </div>
      <Collapse in={open}>
        <div  className='row justify-content-center mt-3'>
          <label className='text-center' htmlFor="profile">
              <input id='profile' style={{display:'none'}} type="file" />
              <img width={'200px'} height={'200px'} className='rounded-circle' src="https://i.pinimg.com/1200x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg" alt="" upload picture srcset="" />
          </label>
          <div className='mt-3'>
           <input type="text" className='form-control' placeholder='GitHub' />
          </div>
          <div className='mt-3'>
           <input type="text" className='form-control' placeholder='LinkedIn' />
          </div>
          <div className='mt-3 text-center d-grid'>
            <button className='btn btn-warning'>
              update
            </button>
          </div>
  
        </div>
      </Collapse>
    </div>
  )
}

export default Profile