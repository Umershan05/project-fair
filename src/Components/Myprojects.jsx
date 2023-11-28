import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userprojectAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addprojectResponceContext, editProjectResponseContext } from '../Contexts/ContextShare';
import { Alert } from 'react-bootstrap';
import EditProject from './EditProject';
function Myprojects() {
    const{editProjectResponse,setEditprojectResponse}=useContext(editProjectResponseContext)
    const {addProjectResponce,setAddProjectResponce}=useContext(addprojectResponceContext)
    const[userProject,setUserproject]=useState([])
    const getUserProjects=async()=>{
        if(sessionStorage.getItem("token"))
        {
            const token=sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              };
            const result=await userprojectAPI(reqHeader)
            if(result.status===200){
                setUserproject(result.data)
            }else{
                console.log(result);
                toast.warning(result.response.data)
            }
        }
    }
    useEffect(()=>{
        getUserProjects()
    },[addProjectResponce,editProjectResponse])
    const handleDelete=async(id)=>{
        const token=sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
          const result=await deleteProjectAPI(id,reqHeader)
          if(result.status===200){
            // page reload
            getUserProjects()
          }else{
            toast.error(result.response.data)
          }
    }
    return (
        <div className='card shadow p-3 mt-3'>
            <div className='d-flex'>
                <h2>My project</h2>
                <div className='ms-auto'><AddProject /></div>
            </div>
            {
                addProjectResponce.title?<Alert className='bg-success' dismissible><span className='fw-bolder text-danger'>{addProjectResponce.title}</span>added succesfully!!</Alert>:null
            }
            <div className='mt-4'>
                {/* collection of user projects */}
                { userProject?.length>0?userProject.map(project=>(
                <div className='border d-flex align-items-center rounded text-primary p-2'>
                <h5>{project.title}</h5>
                <div className='icon ms-auto d-flex'>
                     <EditProject project={project}/>
                    <a className='btn'  href={`${project.github}`} target='_blank'><i class="fa-brands fa-github fa-2x"></i></a>
                    <button onClick={()=>handleDelete(project._id)} className='btn' ><i class="fa-solid fa-trash fa-2x"></i></button>

                </div>
            </div>
                )):
                    
                <p className='text-danger fw-bolder fs-5'> No Projects Uploaded yet!!!</p>
                }
            </div>
            <ToastContainer position="top-right" autoClose={2000}/>
        </div>
    )
}

export default Myprojects