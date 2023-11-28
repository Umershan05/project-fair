import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPI';
import { tokenAuthorisationContext } from '../Contexts/TokenAuth';
function Auth({ register }) {
    const {isAuthorized, setIsAuthorized}=useContext(tokenAuthorisationContext)
    const Navigate=useNavigate()
    const [userData,setUserData]=useState({
        username:"",email:"",password:""
    })
    const isRegisterForm = register ? true : false
    const handleRegister= async (e)=>{
        e.preventDefault();
      const {username,email,password}=userData
      if(!username||!email||!password){
        toast.info("please fill the form completely!!!")
      }else{
        const result=await registerAPI(userData)
        console.log(result);
        if(result.status===200){
            toast.success(`${result.data.username}  has registered successfully`)
            setUserData({
                username:"",email:"",password:""
            })
            Navigate('/login')
        }else{
            toast.warning(result.response.data)
            console.log(result);
        }
      }
    }
    const handleLogin = async (e)=>{
        e.preventDefault()
        const {email,password} = userData
        if(!email || !password){
            toast.info("Please fill the form completely!!!")
        }else{
            const result = await loginAPI(userData)
            if(result.status===200){
                // toast.success(${result.data.username} has registered successfully!!!)
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                setUserData({
                    email:"",password:""
                })
                Navigate('/')
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }

    return (
        <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
            <div className='w-75 container'>
                <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}><i class="fa-solid fa-arrow-left me-1"></i>Back to Home</Link>
                <div className="Card shadow p-5 bg-success">
                    <div className="row align-items-center">
                        <div className='col-lg-6'>
                            <img className='rounded-start w-100' src='https://ncetir.com/Images/login@4x.png' />
                        </div>
                        <div className='col-lg-6'>
                            <div className="d-flex align-items-center flex-column">
                                <h1 className='fw-bolder text-light mt-2'><i class="fa-brands fa-stack-overflow fa-bounce"></i>
                                    Project fair</h1>
                                <h5 className='fw-bolder mt-2 pb-3 text-light'>{
                                    isRegisterForm ? 'Sign up to your account' : 'Sign in to your account'
                                }
                                </h5>
                                <Form className='text-light w-100'>
                                    {
                                        isRegisterForm &&
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Control type="text" placeholder="username" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} />
                                        </Form.Group>
                                    }
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter Email Id" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicpaswd">
                                        <Form.Control type="password" placeholder="Enter passsword" value={userData.password}  onChange={e=>setUserData({...userData,password:e.target.value})} />
                                    </Form.Group>
                                        {
                                            isRegisterForm?
                                            <div className='mt-3'>
                                                <button onClick={handleRegister}   className='btn btn-light mb-2'>Register</button>
                                                <p>Already have account? Click here to <Link to={'/login'}>Login</Link></p>
                                            </div>:
                                            <div className='mt-3'>
                                            <button onClick={handleLogin} className='btn btn-light mb-2'>Login</button>
                                            <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                                        </div>
                                        }
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000}/>
        </div>
    )
}

export default Auth