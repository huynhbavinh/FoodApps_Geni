import React from "react";

import "../../styles/cart-page.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Cart = () => {
    const [listItems, setListItems] = useState([]);

    const [totalMoney, setTotalMoney] = useState(0);

    const fetchData = async () => {
        const items = JSON.parse(window.localStorage.getItem("user"));
        const config = {
            headers: { Authorization: `Bearer ${items.accessToken}` }
        };
        console.log(items.accessToken)
        await axios.get("http://localhost:8080/api/cart/cart?idUser=" + items.id, config).then((data) => {
            setListItems(data.data);
        });
    }
    const cartItems = listItems;
    const total = async () => {
        var money = 0;
        listItems.forEach((product) => {
            money = product.food.price * product.quantity + money;
        });
        setTotalMoney(money);
    }
    const setTotal = () => {
        window.localStorage.setItem("total of money", totalMoney);
    }
    const items = JSON.parse(window.localStorage.getItem("user"));
    const deleteItem = (props) => {


        const newItem = {
            idOfCus: items.id,
            idOfPro: props.id,
            quantity: 1
        }
        axios.get("http://localhost:8080/user/deleteItem", newItem);
    };

    return (
        <Container>
        <Row>
            <Col lg="12">
                {cartItems.length === 0 ? (
                    <h5 className="text-center">Your cart is empty</h5>
                ) : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Title</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center cart__img-box">
                                        <img src={item.food.picture} alt="" />
                                    </td>
                                    <td className="text-center">{item.food.name}</td>
                                    <td className="text-center">${item.food.price}</td>
                                    <td className="text-center">${item.quantity}px</td>
                                    <td className="text-center cart__item-del">
                                        <button onClick={deleteItem(item.food.id)}>delete</button>
                                        {/* // <i class="ri-delete-bin-line" onClick={deleteItem((item.food.id))}>{item.food.id}</i> */}
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                )}

                <div className="mt-4">
                    <h6>
                        Subtotal: $
                        <span className="cart__subtotal">{totalMoney}</span>
                    </h6>
                    <p>Taxes and shipping will calculate at checkout</p>
                    <div className="cart__page-btn">
                        <button className="addTOCart__btn me-4">
                            <Link to="/foods">Continue Shopping</Link>
                        </button>
                        <button className="addTOCart__btn">
                            <Link to="/checkout" onClick={setTotal}>Proceed to checkout</Link>
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
    );
};

export default Cart;
