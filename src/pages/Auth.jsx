import React, { useState } from 'react'
import './Auth.css'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { registerAPI, loginAPI } from '../services/AllApi';
import { Button } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";






function Auth({ InsideRegister }) {

  const [userDetails, setUserDetails] = useState({ username: '', email: '', password: "" })
  console.log(userDetails);
  // password hide and show
  const [showPassword, setShowPassword] = useState(false)

  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()


    // full API call logic 
    try {
      if (userDetails.username && userDetails.email && userDetails.password) {
        // email validation
        const emailPattern = /^[a-z][a-z0-9._]*@[a-z]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(userDetails.email)) {
          toast.error("Invalid email format. Example : domain@gmail.com")
          return
        }
        // password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordPattern.test(userDetails.password)) {
          toast.error("Password must be at least 6 characters and include uppercase, lowercase, number, and special character");
          return
        }

        // do API call 
        const result = await registerAPI(userDetails)
        console.log(result);

        //if registered successfully
        if (result.status == 200) {
          toast.success(`Welcome ${result.data.username} , please Login`)
          // To empty inputfield
          setUserDetails({ username: "", email: "", password: "" })
          Navigate('/login')

        } else {
          // if user alrteady registerd
          if (result.status == 406) {
            toast.warning(result.response.data)
            setUserDetails({ username: "", email: "", password: "" })
          }
        }


      } else {
        toast.warning("please fill the form completely")
      }
    } catch (err) {
      console.log(err);
    }
  }



  // Login API function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginAPI(userDetails);
      console.log(result);
      // if logined successfully
      if (result.status === 200) {
        toast.success("Login successful");
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.Token);
        Navigate("/dashboard");
      } else {
        toast.error(result.response.data);
      }

    } catch (error) {
      console.error(error);
      toast.error("Invalid Email or Password");
    }
  };


  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center shadow p-5  w-50" style={{ marginTop: 150, backgroundColor: ' rgb(30, 98, 100)', borderRadius: 30 }}>
        <h2>{InsideRegister ? 'SIGNUP' : 'LOGIN'}</h2>
        <h6 >Sign {InsideRegister ? 'In' : 'Up'} your Account</h6>
        {
          InsideRegister &&
          <Form.Group className="mt-3 w-50">
            <Form.Label>UserName</Form.Label>
            <Form.Control value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} className="w-100" type="text" placeholder="enter username" />
          </Form.Group>

        }
        <Form.Group className="mt-3 w-50">
          <Form.Label>Email</Form.Label>
          <Form.Control value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} className="w-100" type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="mt-3 w-50 position-relative">
          <Form.Label>Password</Form.Label>
          <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter Password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            className="w-100" />

          <Button type="button"
            onClick={() => setShowPassword(!showPassword)} className="position-absolute end-0 top-50  me-2 p-1 border-0 " style={{ width: 30 }}          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
        </Form.Group>


        {InsideRegister ?
          <div className='mt-4'>
            <button onClick={handleSubmit} className='btn-auth fs-5 fw-bold text-white text-center w-100'>SignUp</button>
            <p>Already have an account? <Link to={'/Login'}>LogIn</Link></p>
          </div>
          :
          <div className='mt-4'>
            <button onClick={handleLogin} className='btn-auth fs-5 fw-bold text-white text-center w-100'>LogIn</button>
            <p>Don't have an Account yet?? <Link to={'/'}>SignUp</Link></p>
          </div>
        }




      </div>
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />


    </>
  )
}

export default Auth
