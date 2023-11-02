import React from 'react'
import './Login.scss'
import video from '../../LoginAssets/video.webm'
import videoWebm from '../../LoginAssets/video.mp4'

const Login = () => {
  return (
    <div className='loginPage flex'>
      <div className='container flex'>

        <div className="videoDiv">
          <video autoPlay loop>
            <source src={video} type="video/mp4" />
            <source src={videoWebm} type="video/webm" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>
        </div>

        {/*<a href='/register'>To Register</a>
        <br />
        <a href='/home'>To Login</a>
        <br />
          This is Login Page*/}
      </div>
    </div>
  )
}

export default Login
