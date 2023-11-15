import './App.scss'
import Home from './components/Dashboard/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: {login ? <Home/> : <div><Login /></div>}
    },
    {
        path: '/register',
        element: <div><Register /></div>
    },
    {
        path: '/home',
        element: <div><Home/></div>
    }
])

function App() {
    const login = window.localStorage.getItem("isLogedIn")
    return(
        <RouterProvider 
            router={router}
        />
    )
}

export default App