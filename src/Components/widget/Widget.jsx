import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const userApiURL ='http://localhost:8080/api/admin/allUsers';
const Widget = ({ type }) => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [userNum, setUserNum] = useState([0]);
  const [orderNum, setOrderNum] = useState([0]);
  const [earningNum, setEarningNum] = useState([0]);
  const [productsNum, setProductNum] = useState([0]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/allUsers").then((res)=>{
        setUserNum(res.data.data.length);
    });
    axios.get("http://localhost:8080/api/admin/earning").then((res)=>{
        setEarningNum(res.data.data);

    });
    axios.get("http://localhost:8080/api/admin/earning").then((res)=>{
        setEarningNum(res.data.data);
    });
    axios.get("http://localhost:8080/auth/showFood").then((res)=>{
        setProductNum(res.data.length);
    });

  },[]
  );
  let data;

  //temporary
  //const amount = 100;
  const diff = 20;

  switch (type) {
    
    case "user":
      
      data = {
        
        title: "USERS",
        isMoney: false,
        link: "See all users",
        amount: userNum,
        navigateTo: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };

      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        amount: orderNum,
        navigateTo: "/users",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        amount: earningNum,
        navigateTo: "/users",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "See details",
        amount: productsNum,
        navigateTo: "/products",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link" onClick={() => {
              navigate(data.navigateTo);
      }}>{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
