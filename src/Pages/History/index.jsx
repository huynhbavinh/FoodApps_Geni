import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/history.css";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext.jsx";
import PopupHistoryDetails from "./PopupHistory.jsx";

const History = () => {
  const { user } = useAuth()

  const [order, setOrder] = useState([]);
  const [cancel, setCanel] = useState([]);
  const [showOrdered, setShowOrdered] = useState(true);
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [target, setTarget] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const data = (await axios.get(`http://localhost:8080/api/history/showOrders?UserID=${user.data.id}`, {
        'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
      })).data
      const data1 = (await axios.get(`http://localhost:8080/api/history/showCancelOrders?UserID=${user.data.id}`, {
        'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
      })).data
      setOrder(data)
      setCanel(data1)
    }
    fetch();
  }, [flag])

  const handleCancelOrder = orderId => {
    const fetch = async () => {
      await axios.post(`http://localhost:8080/api/order/cancelOrders?idOrder=${orderId}&idUser=${user.data.id}`, undefined, {
        'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
      }).then(()=> {
        setFlag(!flag)
      })
    }
    fetch();
  }

  return (
    <Container>
      <div className="history-page">
        <h2>History</h2>

        {showOrdered ? <h4>You have {order.length} orders</h4> : <h4>You have {cancel.length} cancels</h4>}
        <select class="form-select border border-dark mt-3 mb-3"
          aria-label="Default select example"
          onChange={() => { setShowOrdered(!showOrdered) }}>
          <option value="Order" selected>Order</option>
          <option value="Cancel">Cancel</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date of Purchased</th>
              <th>Payment</th>
              <th>Status</th>
              <th></th>
              {showOrdered && <th></th>}
            </tr>
          </thead>
          <tbody>
            {
              showOrdered
                ? order.map(items => (
                  <tr key={items.id}>
                    <td>{items.paymentID}</td>
                    <td>{items.orderDate.replaceAll('T', ' ').split('+')[0]}</td>
                    <td>{items.money} $</td>
                    <td>{items.status}</td>
                    <td style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { setTarget(items.orderID); setShow(true) }}>View</td>
                    <td style={{ cursor: 'pointer', color: 'red' }} onClick={() => { handleCancelOrder(items.orderID); }}>Cancel order</td>
                  </tr>
                ))
                : cancel.map(items => (
                  <tr key={items.id}>
                    <td>{items.paymentID}</td>
                    <td>{items.orderDate.replaceAll('T', ' ').split('+')[0]}</td>
                    <td>{items.money} $</td>
                    <td>{items.status}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => { setTarget(items.orderID); setShow(true) }}>View</td>
                  </tr>
                ))
            }
            {show && <PopupHistoryDetails show={show} setShow={setShow} id={target} />}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default History;
