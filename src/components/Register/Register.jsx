import React, { useState } from "react";
import "./Register.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import Axios from 'axios';

import { FaUserShield } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

import video from "../../LoginAssets/video.webm";
import videoWebm from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

const Register = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = () => {
    Axios.post('http://localhost:3002/register', {
      UserName: userName,
      FirstName: firstName,
      LastName: lastName,
      Password: password
    })
      .then(() => {
        console.log('User has been created');
      })
      .catch((error) => {
        console.error('Error creating user', error);
        console.error('Error creating user', errorMessage);
        setErrorMessage('Error creating user. Please try again.');
      });
  }

  return (
      <div className="registerPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video autoPlay loop>
            <source src={video} type="video/mp4" />
            <source src={videoWebm} type="video/webm" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>

          <div className="textDiv">
            <h2 className="title">Search your favorite store</h2>
            <p>A complete catalog</p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Have an account?</span>
            <Link to={"/"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Let Us Know You!</h3>
          </div>

          <form action="" className="form grid">

              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className='icon' />
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    onChange={(event) => {
                      setUserName(event.target.value)
                    }}
                  />
                </div>
              </div>

              <div className="inputDiv">
              <label htmlFor="firstName">First Name</label>
              <div className="input flex">
                <FaUserPlus className='icon' />
                <input
                  type="text"
                  id="firstname"
                  placeholder="Enter First Name"
                  onChange={(event) => {
                    setfirstName(event.target.value)
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="lastName">Last Name</label>
              <div className="input flex">
                <FaUserPlus className='icon' />
                <input
                  type="text"
                  id="lastname"
                  placeholder="Enter Last Name"
                  onChange={(event) => {
                    setlastName(event.target.value)
                  }}
                />
              </div>
            </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className='icon' />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(event) => {
                      setPassword(event.target.value)
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn flex" onClick={handleRegistration}>
                <span>Register </span>
                <AiOutlineSwapRight className='icon' />
              </button>

              <span className="forgotPassword">
                Forgot yout password? <a href="">Click Here</a>
              </span>

            </form>
        </div>
      </div>
      </div>
  );
};

export default Register;
