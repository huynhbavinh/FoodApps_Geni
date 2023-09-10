import "./list.scss"
import Navbar from "../../Components/navbar/Navbar.jsx";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Category from "./Category.jsx";
const CategoryList = () => {
  return (
    <div className="list">
        <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Category />
      </div>
    </div>
  )
}

export default CategoryList;