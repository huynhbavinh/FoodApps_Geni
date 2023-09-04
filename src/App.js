import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/HomePage.jsx'
import AppLayout from './Pages/Layout/AppLayout.jsx';
import Login from './Pages/Login/LoginForm.jsx';
import SignUp from './Pages/Login/SignUpForm.jsx';
import ProtectedRoute from './Pages/Layout/ProtectedRoute.jsx'
import UserProfile from './Pages/Users/UserProfile.jsx';
import AuthProvider from './Context/AuthContext.jsx'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={
            <ProtectedRoute>
              <AppLayout/>
            </ProtectedRoute>
              }
              > 
            <Route index element={<Navigate replace to='Home'/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
          </Route>
        <Route index element={<Navigate replace to='Home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/menu' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

/*
vao page -> Home, Menu, , Contact register, Login (offline) - Cart, Add to Cart trong menu -> Bat phai login
Login -> Profile, Cart
*/
export default App;
