import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/HomePage.jsx'
import AppLayout from './Pages/Layout/AppLayout.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element ={<AppLayout/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
