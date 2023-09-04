import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/history.css";

const History = (props) => {
    const history = [
        {
            id: "01",
            time: "08/06/2023",
            total_price: 24.0
        },

        {
            id: "02",
            time: "09/06/2023",
            total_price: 115.0
        },
        {
            id: "03",
            time: "10/06/2023",
            total_price: 50.0
        },
        {
            id: "04",
            time: "11/06/2023",
            total_price: 17.0
        }];



    return (
        <Container>
            <div className="history-page">
                <h2>History</h2>

                <h4>You have {history.length} orders</h4>

                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of Purchased</th>
                            <th>total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items => (
                                <tr key={items._id}>
                                    <td>{items.id}</td>
                                    <td>{items.time}</td>
                                    <td>{items.total_price} $</td>
                                    <td><Link to="/Checkout"> View </Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default History;
