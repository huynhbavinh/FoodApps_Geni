import "./list.scss"
import Navbar from "../../Components/navbar/Navbar.jsx";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Rank from "./Rank.jsx";
const RankList = () => {
  return (
    <div className="list">
        <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Rank />
      </div>
    </div>
  )
}

export default RankList;