import "./Products.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cartColumns } from "../../Components/structure/datatablesource.js"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useCart } from "../../Context/CartContext.jsx";
const Products = ({items}) => {
  const { user } = useAuth()
  const {setReRender, reRender} = useCart()
  const handleChangeQuantity = (id, quantity) => {
    const fetch = async () => {
      const newItem = {
        idOfCus: user.data.id,
        idOfPro: id,
        quantity: quantity
      }
      await axios.post("http://localhost:8080/api/cart/addCart", newItem, {
        'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
      }).then(()=> {
        items.forEach(i => {
          if (i.food.id == id) i.quantity += quantity 
        })
      })
    };
    fetch()
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton"
              onClick={() => handleChangeQuantity(params.row.food.id, 1)}>Add 1</div>
            <div
              className="deleteButton"
              onClick={() => handleChangeQuantity(params.row.food.id, -1)}
            >
              Remove 1
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={items}
        columns={cartColumns.concat(actionColumn)}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />
    </div>
  );
};

export default Products;
