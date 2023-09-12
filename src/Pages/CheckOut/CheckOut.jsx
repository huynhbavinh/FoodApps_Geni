import "./Products.scss";
import { DataGrid } from "@mui/x-data-grid";
import { checkoutColumns } from "../../Components/structure/datatablesource.js"
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
const Products = ({items}) => {
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={items.filter(i => i.quantity > 0)}
        columns={checkoutColumns}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />
    </div>
  );
};

export default Products;
