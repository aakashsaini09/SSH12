import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Profile from './pages/Profile'
function App() {
  return (
    <BrowserRouter>
      <p className="read-the-docs">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mainpage' element={<MainPage/>}/>
          <Route path='/profile' element={<Profile/>}/>

        </Routes>
      </p>
    </BrowserRouter>
  )
}

export default App
