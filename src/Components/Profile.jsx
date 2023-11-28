import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { BASE_URL } from '../Services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI } from '../Services/allAPI';
function Profile() {
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: "", email: "", password: "", profile: "", github: "", linkedIn: ""
  })
  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    setUserProfile({ ...userProfile, username:user.username, email: user.email, password: user.password, profile: "", github:user.github, linkedIn: user.linkedIn })
    setExistingImage(user.profile)
  }, [open])
  // user upload
  useEffect(() => {
    if (userProfile.profile) {
      setPreview(URL.createObjectURL(userProfile.profile))
    } else {
      setPreview("")
    }
  }, [userProfile.profile])
  const handleProfileUpdate = async () => {
    const { username, email, password, profile, github, linkedIn } = userProfile
    if (!github || !linkedIn) {
      toast.info("Please fill the form completely")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedIn", linkedIn)
      preview ? reqBody.append("profileImage", profile) : reqBody.append("profileImage", existingImage)

      const token = sessionStorage.getItem("token")
      if (preview) {

        const reqHeader = {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        // api call
        const res = await editUserAPI(reqBody,reqHeader)
        if (res.staus===200) {
          setOpen(!open)
          sessionStorage.setItem("existingUser", JSON.stringify(res.data))
        } else {
          setOpen(!open)
          console.log(res);
          console.log(res.response.data);
        }
      }
      else {
        const reqHeader = {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }

        // api call
        const res = await editUserAPI(reqBody, reqHeader)
        if (res.staus === 200) {
          setOpen(!open)
          sessionStorage.setItem("existingUser", JSON.stringify(res.data))
        } else {
          setOpen(!open)
          console.log(res);
          console.log(res.response.data);
        }
      }
    }
  }

  return (
    <div className='card shadow p-5'>
      <div className='d-flex justify-content-between'>
        <h2> My Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-info'><i class="fa-solid fa-chevron-down fa-beat-fade"></i></button>
      </div>
      <Collapse in={open}>
        <div className='row justify-content-center mt-3'>
          <label className='text-center' htmlFor="profile">
            <input id='profile' style={{ display: 'none' }} type="file" onChange={e => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
            {
              existingImage !== "" ?
                <img width={'200px'} height={'200px'} src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} className='rounded-circle' alt="Upload" />
                :
                <img width={'200px'} height={'200px'} src={preview ? preview : `https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/user_man_male_profile_account-512.png`} className='rounded-circle' alt="Upload" />
            }
          </label>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='GitHub' value={userProfile.github} onChange={e => setUserProfile({ ...userProfile, github: e.target.value })} />
          </div>
          <div className='mt-3'>
            <input type="text" className='form-control' placeholder='LinkedIn' value={userProfile.linkedIn} onChange={e => setUserProfile({ ...userProfile, linkedIn: e.target.value })} />
          </div>
          <div className='mt-3 text-center d-grid'>
            <button className='btn btn-warning' onClick={handleProfileUpdate}>
              update
            </button>
          </div>

        </div>
      </Collapse>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  )
}

export default Profile