import "./Products.scss";
import { DataGrid } from "@mui/x-data-grid";
import { cartColumns } from "../../Components/structure/datatablesource.js"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
const Products = ({items}) => {
  const { user } = useAuth()
  const [flag, setFlag] = useState(0);

  const handleChangeQuantity = (id, quantity) => {
    
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
        flag={flag}
      />
    </div>
  );
};

export default Products;
