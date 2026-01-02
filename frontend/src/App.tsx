import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Signup'
import Login from './pages/Login'
function App() {
  return (
    <BrowserRouter>
      <p className="read-the-docs">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>

        </Routes>
      </p>
    </BrowserRouter>
  )
}

export default App
