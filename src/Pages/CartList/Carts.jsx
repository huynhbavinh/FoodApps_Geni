import "./Product.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cartColumns } from "../../Components/structure/datatablesource.js"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
const Products = ({ items }) => {
  const [total, setTotal] = useState(0)
  const [change, setChange] = useState(false)

  useEffect(() => {
    let temp = 0;
    items.forEach(i => {
      temp += i.food.price * i.quantity
    })
    setTotal(temp)
  }, [change])
  const { user } = useAuth()
  const handleChangeQuantity = (id, quantity) => {
    const fetch = async () => {
      const newItem = {
        idOfCus: user.data.id,
        idOfPro: id,
        quantity: quantity
      }
      await axios.post("http://localhost:8080/api/cart/addCart", newItem, {
        'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
      }).then(() => {
        items.map(i => {
          if (i.food.id == id) return i.quantity += quantity
          else return i
        })
        setChange(!change);
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
        rows={items.filter(i => i.quantity > 0)}
        columns={cartColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      <h6>
        Subtotal: $
        <span className="cart__subtotal">{total}</span>
      </h6>
    </div>
  );
};

export default Products;
