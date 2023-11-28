import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BASE_URL } from '../Services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../Services/allAPI';
import { editProjectResponseContext } from '../Contexts/ContextShare';
function EditProject({ project }) {
  const{editProjectResponse,setEditprojectResponse}=useContext(editProjectResponseContext)
  const [projectDetails, setprojectDetails] = useState({
    id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImage: ""
  })
  const [preview, setPreview] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setprojectDetails({
      id: project._id, title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImage: ""
    })
    setPreview("")
  }

  const handleShow = () => setShow(true);
  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage]
  )
  const handleUpdate=async ()=>{
    const {id,title,languages,github,website,overview,projectImage}= projectDetails
    if (!title || !languages || !overview  || !github || !website) {
      toast.info("please fill the form completely")
    } else {
      const reqbody=new FormData()
      reqbody.append("title", title)
      reqbody.append("languages", languages)
      reqbody.append("overview", overview)
      reqbody.append("github", github)
      reqbody.append("website", website)
      preview?reqbody.append("projectImage", projectImage):reqbody.append("projectImage", project.projectImage)
      const token=sessionStorage.getItem("token")
      if(preview){
     const reqHeader={
      "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${token}`
     }
      // api call
      const result=await editProjectAPI(id,reqbody,reqHeader)
      if(result.status===200){
        handleClose()
        // pass response to my project
        setEditprojectResponse(result.data)
      }else{
        console.log(result);
        toast.error(result.response.data)
      }
      }else{
        const reqHeader={
          "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
         } 
        //  api call
        const result=await editProjectAPI(id,reqbody,reqHeader)
        if(result.status===200){
          handleClose()
          // pass response to my project
          setEditprojectResponse(result.data)
        }else{
          console.log(result);
          toast.error(result.response.data)
        }
      }
    }
  }


  return (
    <>
      <button onClick={handleShow} className='btn' ><i class="fa-solid fa-pen-to-square fa-2x"></i></button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title> Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <label>
                <input type="file" style={{ display: 'none' }}onChange={e=>setprojectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                <img height={'300px'} width={'300px'} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="" /></label>
            </div>
            <div className='col-lg-6'>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={e=>setprojectDetails({...projectDetails,title:e.target.value})} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Language used' value={projectDetails.languages}onChange={e=>setprojectDetails({...projectDetails,languages:e.target.value})} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Github Link' value={projectDetails.github}onChange={e=>setprojectDetails({...projectDetails,github:e.target.value})} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={e=>setprojectDetails({...projectDetails,website:e.target.value})} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Project overview' value={projectDetails.overview} onChange={e=>setprojectDetails({...projectDetails,overview:e.target.value})} /></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}  >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={2000}/>
    </>
  )
}

export default EditProject