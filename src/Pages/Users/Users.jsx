import "./Users.scss";
import { DataGrid } from "@mui/x-data-grid";
import { usersColumns} from "../../Components/structure/datatablesource.js";
import { Link } from "react-router-dom";
import axios  from "axios";
import React, { useState,useEffect } from "react";
const apiURL ='http://localhost:8080/api/admin/allUsers';

const Users = () => {
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/allUsers").then((res)=>{
        setData(res.data.data);
        console.log(res.data.data);
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
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={usersColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Users;
