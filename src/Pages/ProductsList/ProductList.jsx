import "./list.scss"
import Navbar from "../../Components/navbar/Navbar.jsx";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Products from "./Products.jsx";
const ListProduct = () => {
  return (
    <div className="list">
        <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Products />
      </div>
    </div>
  )
}

export default ListProduct