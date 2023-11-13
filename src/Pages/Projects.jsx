import React from 'react'

import Header from '../Components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'

function Projects() {
  return (
   <>
     <Header/>
     <div style={{marginTop:'100px'}} className="projects">
      <h1 className='text-center mb-5'>All projects</h1>
      <div className='d-flex justify-content-center align-items-center w-100'>
        <div className='d-flex border w-50 rounded'>
          <input placeholder='search projects technology used' className='form-control'  type="text" />
          <i style={{marginLeft:"-50px"}}  class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>
      <Row className="mt-5 container-fluid">
        <Col sm={12} md={6} lg={4}>
         <ProjectCard/>
        </Col>

      </Row>
     </div>

   </>
  )
}

export default Projects