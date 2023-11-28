import React, { useEffect, useState } from 'react'

import Header from '../Components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { allProjectAPI } from '../Services/allAPI'

function Projects() {
  const[searchKey,setSearchKey]=useState("")
  const [allProjects, setAllProjects] = useState([]);
  const getAllProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const result = await allProjectAPI(searchKey,reqHeader);
      if (result.status === 200) {
        setAllProjects(result.data);
        console.log(allProjects);
        console.log(token);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);
  return (
   <>
     <Header/>
     <div style={{marginTop:'100px'}} className="project">
      <h1 className='text-center mb-5'>All projects</h1>
      <div className='d-flex justify-content-center align-items-center w-100'>
        <div className='d-flex border w-50 rounded'>
          <input placeholder='search projects technology used' className='form-control'  type="text" value={searchKey} onChange={e=>setSearchKey(e.target.value)} />
          <i style={{marginLeft:"-50px"}}  class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>
      <Row className="mt-5 container-fluid">
      {allProjects?.length > 0
          ? allProjects.map((project) => (
              <Col sm={12} md={6} lg={4}>
                <ProjectCard project={project} />
              </Col>
            ))
          : <p style={{fontSize:"50px"}} className='fw-bolder text-danger'>Please Login</p>}

      </Row>
     </div>

   </>
  )
}

export default Projects