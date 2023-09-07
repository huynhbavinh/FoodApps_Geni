import "./Products.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../Components/structure/datatablesource.js"
import { Link } from "react-router-dom";
import axios  from "axios";
import React, { useState,useEffect } from "react";
const Products = () => {
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    axios.get("http://localhost:8080/auth/showFood").then((res)=>{
        setData(res.data);
        console.log(res.data)
    })
  },[]
  );
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/products/addproduct" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Products;
