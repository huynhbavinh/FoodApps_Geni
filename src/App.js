import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/HomePage.jsx'
import AppLayout from './ui/AppLayout.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element ={<AppLayout/>}>
          <Route path='home' element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
