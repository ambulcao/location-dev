import { useNavigate } from 'react-router-dom';
 
export default function Dashboard() {
    const naviget = useNavigate();
    function logoutSubmit(){
        localStorage.setItem("login", "");
        localStorage.setItem("loginStatus", "Logged out successfully!")
        naviget("/");
    }
    const user = localStorage.getItem('user');
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Cairocoders</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-outline-primary" type="submit" onClick={logoutSubmit}>
                Logout
              </button>
            </div>
          </div>
        </div>
        </nav>
        <div className="container" style={{paddingTop: 50}}>
            <h3>{user}</h3>
            <h3>Dashboard Page</h3>
        </div>
        </>
    )
}