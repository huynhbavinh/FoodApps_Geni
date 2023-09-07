import "./list.scss"
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Navbar from "../../Components/navbar/Navbar.jsx";
import Users from "./Users.jsx"
const ListUser = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
      <Navbar/>
        <Users/>
      </div>
    </div>
  )
}

export default ListUser