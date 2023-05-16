import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIroutes';

function Register() {

 const navigate = useNavigate()

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  }, []);

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (handelValidation()) {
      console.log("in handelValidation", registerRoute)
      const { password, email, username } = values;
      const { data } = await axios.post(registerRoute, {
        username, 
        email, 
        password,
      });
      if (data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true){
        localStorage.setItem('chat-app=user', JSON.stringify(data.user))
        navigate("/");
      }
    }
  };


  const handelValidation = () => {
    const { password, confirmPassword, email, username } = values;
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Passwrod should be same.',
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error('Username should be greater than 3 characters.', toastOptions);
      return false;
    } else if (password.length < 3) {
      toast.error('Password should be more than or equal to 8 characters.', toastOptions);
      return false;
    }
    else if (email === "") {
      toast.error("email is required.", toastOptions);
      return false;
    }
    return true;
  };


  const handelChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handelSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(e) => handelChange(e)} />
          <input type="email" placeholder='Email' name='email' onChange={(e) => handelChange(e)} />
          <input type="password" placeholder='Password' name='password' onChange={(e) => handelChange(e)} />
          <input type="password" placeholder='Confirm password' name='confirmPassword' onChange={(e) => handelChange(e)} />
          <button type='submit'> Create User </button>
          <span>
            Already have an account ? <Link to='/login'>Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 flex-direction: column;
 gap: 1rem;
 align-items: center;
 background-color: rgb(19, 19, 36);

 .brand{
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img{
    height: 5rem;
  }
  h1{
    color: white;
    text-transform: uppercase;
  }
 }
 form{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;

  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
        background-color: #4e03ff;
    }
  }
  span{
    color: white;
    text-tranform: uppercase;
    a{
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
  }
 }
 `;

export default Register