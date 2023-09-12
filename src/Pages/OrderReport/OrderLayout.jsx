import "./OrderLayout.scss"
import Navbar from "../../Components/navbar/Navbar.jsx";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import OrderGrid from "./OrderGrid.jsx";
const OrderLayout = () => {
  return (
    <div className="list">
        <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <OrderGrid />
      </div>
    </div>
  )
}

export default OrderLayout