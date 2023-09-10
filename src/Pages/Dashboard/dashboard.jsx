import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Navbar from "../../Components/navbar/Navbar.jsx";
import "./Dashboard.scss";
import Widget from "../../Components/widget/Widget.jsx";
import Featured from "../../Components/featured/Featured.jsx";
import Chart from "../../Components/chart/Chart.jsx";
import Table from "../../Components/table/Table.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";

const Dashboard = () => {
    const {user} = useAuth();
return (
<div className="home">
    <Sidebar />
    <div className="homeContainer">
    <Navbar />
    <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="products" />
    </div>
    <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
    </div>
    <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <Table />
    </div>
    </div>
</div>
);
};

export default Dashboard;
