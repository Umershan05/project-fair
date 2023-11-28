import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import titleImage from '../Asset/des.jpg'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../Services/allAPI'

function Home() {
  const [loggedin,setLoggedin]=useState(false)
  const[homeProjects,setHomeProjects]=useState([])
  const getHomeProjects=async ()=>{
    const result=await homeProjectAPI()
    if(result.status===200){
      setHomeProjects(result.data)
    }else{
      console.log(result);
      console.log(result.response.data);
    }
  }
  console.log(homeProjects);
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setLoggedin(true)
    }else{
      setLoggedin(false)
    }
    // api call
       getHomeProjects()
  },[])
  return (
    <>
    <div style={{width:'100%',height:'100vh',backgroundColor:'#90ee90'}} className='container-fluid rounded'>
    <Row className='align-items-center p-5'>
    <Col sm={12} md={6}>
      <h1 style={{fontSize:'80px'}} className='fw-bolder text-light mb-5'><i class="fa-brands fa-stack-overflow fa-bounce"></i>
        Project fair</h1>
        <p>One Stop Destination for all Sofware DevelopmentProjects,Where user can add manage their project as wel as access all projects available in our website..what are youwaiting for!!</p>
      { loggedin?
       <Link to={'/dashboard'} className='btn btn-warning'>Manage your Project<i className='fa-solid fa-right-long fa-beat ms-2'></i></Link>:
        <Link to={'/login'} className='btn btn-warning'>Start to explore<i className='fa-solid fa-right-long fa-beat ms-2'></i></Link>
        }

    </Col>
     <Col sm={12} md={6}>
      <img style={{marginTop:'100px'}} className='w-75 rounded-circle' src={titleImage}></img>
     </Col>
    </Row>
    </div>
    {/* projects */}
    <div className="all-projects mt-5">
      <h1 className="text-center mb-5">Explore Our Projects</h1>
     <marquee scrollAmount={25}>
       <div className='d-flex justify-content-between'>
        {homeProjects?.length>0?homeProjects.map(project=>(
        <div className='me-5'>
         <ProjectCard project={project}/>
        </div>
          )):null}
       </div>
        
     </marquee>
     <div className="text-center mb-5 "><Link to={'/Projects'}> View More Projects</Link></div>
    </div>
    </>
  )
}

export default Home