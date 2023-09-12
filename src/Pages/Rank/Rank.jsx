import "./Rank.scss";
import { DataGrid } from "@mui/x-data-grid";
import { rankColumns } from "../../Components/structure/datatablesource.js"
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../Context/AuthContext.jsx";

const apiURL = 'http://localhost:8080/api/rank/allRanks'
const apiRank = 'http://localhost:8080/api/rank/newRank'
const Rank = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [nameRank, setNameRank] = useState('');
  const [amountTotal, setAmountSpent] = useState();
  const [rateDiscount, setDiscountRate] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const config = {
    headers: { Authorization: `Bearer ${user.data.accessToken}` }
  };
  const handleAddRank = () => {
    const rankInfo = {
      nameRank,
      amountTotal,
      rateDiscount,
    };
    axios.post(apiRank, rankInfo, config).then(
      (res) => {
        setShow(false);
      }
    );
  }
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    axios.get(apiURL, config).then((res) => {
      setData(res.data.data);
    })
  }, [show]
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
        <div className="link" onClick={handleShow} >
          Add New
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={rankColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(data) => data.id_Rank}
        rowsPerPageOptions={[9]}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Rank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rank name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
                onChange={(e) => setNameRank(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount Spent</Form.Label>
              <Form.Control
                type="text"
                placeholder="0"
                autoFocus
                required
                onChange={(e) => setAmountSpent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Rate Discount</Form.Label>
              <Form.Control
                type="text"
                placeholder="%"
                autoFocus
                required
                onChange={(e) => setDiscountRate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRank}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default Rank;
