import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/HomePage.jsx'
import AppLayout from './Pages/Layout/AppLayout.jsx';
import Login from './Pages/Login/LoginForm.jsx';
import SignUp from './Pages/Login/SignUpForm.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
        <Route element ={<AppLayout/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
