import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import video from "../../LoginAssets/video.webm";
import videoWebm from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";
import utilizadoresData from "../../data/utilizadores.json"; // Importa os dados de utilizadores

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = utilizadoresData.utilizadores.find(
      (u) => u.username === loginUserName && u.password === loginPassword
    );

    if (user) {
      const userRole = user.departamento ? "Admin" : "User";

      if (userRole === "Admin") {
        setLoginStatus('Login successful');
        navigate("/home");
      } else {
        setLoginStatus('Login successful');
        navigate("/dashboard");
      }
    } else {
      setLoginStatus('Credentials do not match');
    }
  };

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
            <span className="showMessage">{loginStatus}</span>
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

            {loginStatus === 'Credentials do not match' && (
              <span className="btn-message showBtnMessage flex">{loginStatus}</span>
            )}

            <div style={{ fontSize: "12px", border: "2px solid #000", padding: "10px" }}>
            <strong>To test - </strong>
            <span>User: Admin / </span>
            <span>Password: 123</span>
            </div>

            <span className="forgotPassword">
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
