import React,{useState} from 'react'
import { Card,Modal,Row,Col } from 'react-bootstrap'
import titleimage from '../Asset/web.jpg'
function ProjectCard() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Card className='shadow mb-5 btn w-75' onClick={handleShow}>
      <Card.Img  variant="top" src={titleimage} />
      <Card.Body>
        <Card.Title>Project Title</Card.Title>
        </Card.Body>
    </Card>
    <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                <img style={{height:'200px'}} className='img-fluid' src={titleimage} alt='project image'/>
                </Col>
                <Col md={6}>
                    <h2>Project Title</h2>
                    <p>Project Overview :Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  </p>
                    <p>Language Used :<span className='fw-bolder'>HTML,CSS,React</span></p>
                    
                </Col>
            </Row>
            <div className='mt-3'>
                        <a href="https://github.com/Umershan05/Ecommerce" target='_blank' className='me-3 btn'><i class="fa-brands fa-github fa-2x"></i></a>
                   
                    <a href="https://ecommerce-ashen-theta.vercel.app/" target='_blank' className='me-3 btn'><i class="fa-solid fa-link fa-2x"></i></a>
                    </div>
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default ProjectCard