import React from 'react'
import Header from '../Components/Header'
import { Row,Col } from 'react-bootstrap'
import Myprojects from '../Components/Myprojects'
import Profile from '../Components/Profile'

function Dashboard() {
  return (
    < >
   
    <Header insideDashboard/>
    <Row style={{marginTop:'100px'}} className='container-fluid'>
        <Col sm={12} md={8}>
          {/* my project */}
          <h2>Welcome <span className='text-warning'>User</span></h2>
          < Myprojects />
        </Col>
        <Col sm={12} md={4}>
          {/* my-profile */}
          <Profile />
        </Col>
      </Row>
  </>
  )
}

export default Dashboard