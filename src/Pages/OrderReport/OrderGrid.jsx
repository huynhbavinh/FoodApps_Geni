import "./OrderGrid.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns } from "../../Components/structure/datatablesource.js"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
const OrderGrid = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleView = id => {
    //setData(data.filter((item) => item.id !== id));
    // navigate(`/SingleProduct/${id}`);
    navigate(`${id}`);
  };
  useEffect(() => {
    console.log('a')
    axios.get("http://localhost:8080/auth/showFood").then((res) => {
      setData(res.data);
    })
  }, []);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton"
              onClick={() => handleView(params.row.id)}>View</div>
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
      />
    </div>
  );
};

export default OrderGrid;
