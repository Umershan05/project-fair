import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';
import { addprojectResponceContext } from '../Contexts/ContextShare';
function AddProject() {
  const {addProjectResponce,setAddProjectResponce}=useContext(addprojectResponceContext)
  const [show, setShow] = useState(false);
  const [projectDetails, setprojectDetails] = useState({
    title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
  })
  // console.log(projectDetails);
  const [preview, setPreview] = useState("")
  const [token, setToken] = useState()

  const handleClose = () => {
    setShow(false);
    setprojectDetails({
      title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
    })
    setPreview("")

  }
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  },[])
  const handleAdd = async (e) => {
    e.preventDefault()
    const { title, languages, overview, projectImage, github, website } = projectDetails
    if (!title || !languages || !overview || !projectImage || !github || !website) {
      toast.info("please fill the form completely")
    } else {
      const reqbody = new FormData()
      reqbody.append("title", title)
      reqbody.append("languages", languages)
      reqbody.append("overview", overview)
      reqbody.append("projectImage", projectImage)
      reqbody.append("github", github)
      reqbody.append("website", website)
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addProjectAPI(reqbody,reqHeader)
      console.log(result);
      if (result.status == 200) {
        console.log(result.data);
        handleClose()
        setAddProjectResponce(result.data)
      } else {
        console.log(result);
        toast.warning(result.response.data);
      }
      }
      
    }

  }
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
                <input type="file" style={{ display: 'none' }} onChange={e => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                <img height={'300px'} width={'300px'} src={preview ? preview : "https://static.wikia.nocookie.net/find-the-markers-roblox/images/5/5f/Placeholder.jpg/revision/latest?cb=20220313030844"} alt="" /></label>
            </div>
            <div className='col-lg-6'>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title} onChange={e => setprojectDetails({ ...projectDetails, title: e.target.value })} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Language used' value={projectDetails.languages} onChange={e => setprojectDetails({ ...projectDetails, languages: e.target.value })} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Github Link' value={projectDetails.github} onChange={e => setprojectDetails({ ...projectDetails, github: e.target.value })} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Website Link' value={projectDetails.website} onChange={e => setprojectDetails({ ...projectDetails, website: e.target.value })} /></div>
              <div className='mb-3'><input type="text" className='form-control' placeholder='Project overview' value={projectDetails.overview} onChange={e => setprojectDetails({ ...projectDetails, overview: e.target.value })} /></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd} >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={2000}/>
    </>
  )
}

export default AddProject