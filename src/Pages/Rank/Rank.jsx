import "./Rank.scss";
import { DataGrid } from "@mui/x-data-grid";
import { rankColumns} from "../../Components/structure/datatablesource.js"
import { Link } from "react-router-dom";
import axios  from "axios";
import React, { useState,useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
const apiURL ='http://localhost:8080/api/rank/allRanks'
const Rank = () => {
  const {user} = useAuth();
  const [data, setData] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${user.data.accessToken}` }
  };
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    axios.get(apiURL, config).then((res)=>{
        setData(res.data.data);
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
        Add New Rank
        <Link to="/products/addproduct" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={rankColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(data) => data.id_Rank}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Rank;
