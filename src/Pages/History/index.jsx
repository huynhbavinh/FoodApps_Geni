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
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const data = (await axios.get(`http://localhost:8080/api/history/showOrders?UserID=${user.data.id}`, {
                'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
            })).data
            setOrder(data)
        }
        fetch();
    }, [])

    return (
        <Container>
            <div className="history-page">
                <h2>History</h2>

                <h4>You have {order.length} orders</h4>

                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of Purchased</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map(items => (
                                <tr key={items.id}>
                                    <td>{items.paymentID}</td>
                                    <td>{items.orderDate.replaceAll('T',' ').split('+')[0]}</td>
                                    <td>{items.money} $</td>
                                    <td>{items.status}</td>
                                    <td style={{cursor: 'pointer'}} onClick={()=> {setTarget(items.orderID); setShow(true)}}>View</td>
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
