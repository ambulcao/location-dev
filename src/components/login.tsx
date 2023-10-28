import React, { useState } from 'react';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleInputChange = (e, field) => {
    if (field === 'user') {
      setUser(e.target.value);
    } else if (field === 'pass') {
      setPass(e.target.value);
    }
  };

  const loginSubmit = () => {
    // Aqui, você pode adicionar sua lógica de autenticação
    // Se a autenticação falhar, defina a mensagem de erro
    if (user === 'usuario' && pass === 'senha') {
      // Autenticação bem-sucedida
      setMsg('Login bem-sucedido');
      setError('');
    } else {
      // Autenticação falhou
      setError('Credenciais inválidas');
      setMsg('');
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem', maxHeight: '100%' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <p>
                      {error !== '' ? (
                        <div style={{ color: '#842029' }}>
                          <b>{error}</b>
                        </div>
                      ) : (
                        <div style={{ color: '#badbcc' }}>
                          <b>{msg}</b>
                        </div>
                      )}
                    </p>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }} />
                      <span className="h1 fw-bold mb-0">Login</span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                      Sign into your account
                    </h5>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        placeholder="User Name"
                        value={user}
                        onChange={(e) => handleInputChange(e, 'user')}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="pass"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => handleInputChange(e, 'pass')}
                      />
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        type="button"
                        className="btn btn-dark btn-lg btn-block"
                        onClick={loginSubmit}
                      >
                        Login
                      </button>
                    </div>
                    <a href="#!" className="small text-muted">
                      Forgot password?
                    </a>
                    <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                      Don't have an account? <a href="#!" style={{ color: '#393f81' }}>
                        Register here
                      </a>
                    </p>
                    <a href="#!" className="small text-muted">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}