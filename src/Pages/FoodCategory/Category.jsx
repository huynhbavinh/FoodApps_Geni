import "./Category.scss";
import { DataGrid } from "@mui/x-data-grid";
import { categoryColumns} from "../../Components/structure/datatablesource.js"
import { Link } from "react-router-dom";
import axios  from "axios";
import React, { useState,useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';  
import { useAuth } from "../../Context/AuthContext.jsx";

const apiURL ='http://localhost:8080/api/category/allCategory'
const apiCate = 'http://localhost:8080/api/category/addCategory'
const Category = () => {
  const {user} = useAuth();
  const [name_category, setCateName] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${user.data.accessToken}` }
  };
  const handleAddCate = () => {
    const cateInfo = {
      name_category
    };
    axios.post(apiCate, cateInfo, config).then(
      (res) => {
        console.log(res)
        setShow(false);
      }
    );
  }
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
        Add New Category
        <div className="link" onClick={handleShow}>
          Add New
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(data) => data.id_Category}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
                onChange={(e) => setCateName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;
