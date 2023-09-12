import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/HomePage.jsx'
import { AppLayout, AdminLayout } from './Pages/Layout/AppLayout.jsx';
import Login from './Pages/Login/LoginForm.jsx';
import SignUp from './Pages/Register/SignUp.jsx';
import Dashboard from './Pages/Dashboard/dashboard.jsx';
import { ProtectedRoute, AdminProtectedRoute } from './Pages/Layout/ProtectedRoute.jsx';
import UserProfile from './Pages/Users/UserProfile.jsx';
import { AuthProvider } from './Context/AuthContext.jsx'
import AllFood from './Pages/Products/AllFood.jsx';
import Carts from './Pages/CartList/CartList.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import ListProduct from "./Pages/ProductsList/ProductList.jsx";
import ListUser from "./Pages/Users/UserList.jsx";
import CategoryList from "./Pages/FoodCategory/CategoryList.jsx";
import RankList from './Pages/Rank/RankList.jsx';
import AddProduct from './Pages/ProductsList/AddProduct.jsx';
import SingleProduct from './Pages/ProductsList/SingleProduct.jsx';
import Single from './Pages/single/Single.jsx';
import CheckOutList from './Pages/CheckOut/CheckOutList.jsx';
import { userInputs } from "./Components/structure/formSource.js"
import { productInputs } from "./Components/structure/formSource.js"
import { CartProvider } from './Context/CartContext.jsx';
import History from './Pages/History/index.jsx'
import OrderReport from './Pages/OrderReport/OrderLayout.jsx'
function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <Routes>
          {/*Protected route */}
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
          >
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/cart' element={<Carts />} />
            <Route path="users/:id" element={<Single />} />
            <Route path="/checkout" element={<CheckOutList />} />
            <Route path="/history" element={<History />} />
          </Route>
          //
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/menu' element={<SignUp />} />
            <Route path='/foods' element={<AllFood />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
          // admin
          <Route element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
          >
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="products">
              <Route index element={<ListProduct />} />
              <Route
                path="addproduct"
                element={<AddProduct inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="products/:id" element={<SingleProduct />} />
            <Route path="users">
              <Route index element={<ListUser />} />
              <Route
                path="adduser"
                element={<AddProduct inputs={productInputs} title="Add New User" />}
              />
            </Route>  
            <Route path="users/:id" element={<Single />} />
            <Route path='/category' element={<CategoryList />} />
            <Route path='/rank' element={<RankList />} />
            <Route path='/orders' element={<OrderReport />} />
          </Route>
          <Route element={<AdminLayout />}>

          </Route>
          // public
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

/*
vao page -> Home, Menu, , Contact register, Login (offline) - Cart, Add to Cart trong menu -> Bat phai login
Login -> Profile, Cart
*/
export default App;
