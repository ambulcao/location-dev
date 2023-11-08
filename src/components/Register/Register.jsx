import React, { useState } from "react";
import "./Register.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import Axios from 'axios';

//import { MdMarkEmailRead } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

import video from "../../LoginAssets/video.webm";
import videoWebm from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

const Register = () => {

  // UseState to hold our inputs
  //const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  // Onclick let us get what the user has entered
  const createUser = () => {
    // We shall require Axios to create an API that connects to the server
    Axios.post('http://localhost:3002/register', {
      // create variable to send to the server through the route
      //Email: email,
      UserName: userName,
      Password: password
    }).then(() => {
      console.log('User has been created')
    })
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
            {/*<div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon' />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                />
              </div>
            </div>*/}

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

              <button type="submit" className="btn flex" onClick={createUser}>
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
