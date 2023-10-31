import './App.scss'
import Home from './components/Dashboard/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

function App() {
    return(
        <div>
            <Home/>
            <Login />
            <Register />
        </div>
    )
}

export default App