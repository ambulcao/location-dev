import React, { useState } from "react";
import "./Login.scss";
import "../../App.scss";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import video from "../../LoginAssets/video.webm";
import videoWebm from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3002/login', {
      LoginUserName: loginUserName,
      LoginPassword: loginPassword
    })
    .then((response) => {
      console.log(response);
      if (response.data && response.data.length > 0) {
        setLoginStatus('Login successful');
        // Redirecionar para a página desejada após o login
        navigate("/home");
      } else {
        setLoginStatus('Credentials do not match');
      }
    })
      .catch((error) => {
        console.error('Error during login', error)
        setLoginStatus('Error during login. Please try again.')
      })
  }

  return (
    <div className="loginPage flex">
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
            <span className="text">Don't have an account?</span>
            <Link to={"/register"}>
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back!</h3>
          </div>

          <form action="" className="form grid">
            <span className="showMessage">Login Status will go here</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input 
                  type="text" 
                  id="username" 
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setLoginUserName(event.target.value)
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value)
                  }}  
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={handleLogin}>
              <span>Login </span>
              <AiOutlineSwapRight className='icon' />
            </button>

            {/* Condição para exibir a mensagem apenas quando necessário */}
            {loginStatus === 'Credentials do not match' && (
              <span className="btn-message showBtnMessage flex">{loginStatus}</span>
            )}

            <a href="/home">Mapa</a>

            <span className="forgotPassword">
              Forgot yout password? <a href="">Click Here</a>
            </span>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
