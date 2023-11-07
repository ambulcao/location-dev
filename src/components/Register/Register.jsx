import React from "react";
import "./Register.scss";
import "../../App.scss";
import { Link } from "react-router-dom";
import { MdMarkEmailRead } from 'react-icons/md';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import video from "../../LoginAssets/video.webm";
import videoWebm from "../../LoginAssets/video.mp4";
import logo from "../../LoginAssets/logo.png";

const Register = () => {
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
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon'/>
                <input type="email" id="email" placeholder="Enter Email"/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id="password" placeholder="Enter Password"/>
              </div>
            </div>

            <button type="submit" className="btn flex">
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
