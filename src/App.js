import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/HomePage.jsx'
import AppLayout from './Pages/Layout/AppLayout.jsx';
import Login from './Pages/Login/LoginForm.jsx';
import SignUp from './Pages/Login/SignUpForm.jsx';
import CartListDetails from './Pages/Cart/CartListDetails.jsx'
import CheckOut from './Pages/CheckOut/index.jsx'
import FoodDetails from './Pages/Products/FoodDetails.jsx'
import History from './Pages/History/index.jsx'
import AllFoods from './Pages/Products/AllFood.jsx';
import Contact from './Pages/Contact/Index.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
        <Route element ={<AppLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/cart' element={<CartListDetails/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/fooddetails' element={<FoodDetails/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='/foods' element={<AllFoods/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
