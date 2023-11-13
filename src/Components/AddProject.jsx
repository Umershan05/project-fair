import React,{useState} from 'react'
import { Modal,Button } from 'react-bootstrap'

function AddProject() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    
    <>
        <Button variant="primary" onClick={handleShow}>
        Add project
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
                 <label>
                  <input type="file" style={{display:'none'}}/>
                  <img src="https://static.wikia.nocookie.net/find-the-markers-roblox/images/5/5f/Placeholder.jpg/revision/latest?cb=20220313030844" alt="" /></label>
            </div>
            <div className='col-lg-6'>
               <div className='mb-3'><input type="text" className='form-control' placeholder='Project Title' /></div>
               <div className='mb-3'><input type="text" className='form-control' placeholder='Language used' /></div>
               <div className='mb-3'><input type="text" className='form-control' placeholder='Github Link' /></div>
               <div className='mb-3'><input type="text" className='form-control' placeholder='Website Link' /></div>
               <div className='mb-3'><input type="text" className='form-control' placeholder='Project overview' /></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProject