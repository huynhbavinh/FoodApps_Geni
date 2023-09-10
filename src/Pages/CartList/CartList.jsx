import "./list.scss"

import Carts from "./Carts.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useCart } from "../../Context/CartContext.jsx";

const ListProduct = () => {
  const { user } = useAuth()
  const {totalMoney, setTotalMoney, carts, setCart} = useCart()
  useEffect(() => {
    if (user) {
      let total = 0;
      const fetch = async () => {
        const carts = (await axios.get(`http://localhost:8080/api/cart/cart?idUser=${user.data.id}`, {
          'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
        })).data;
        setCart(carts)
        carts.forEach(i => {
          total += parseInt(i.quantity) * parseInt(i.food.price);
        })
        setTotalMoney(total);
      }
      fetch();
    }
  }, [user])
  return (
    <div className="list">
      <div className="listContainer" >
        <Carts items={carts}/>
        <div className="mt-4 d-flex justify-content-around">
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
              <Link to="/checkout" onClick={setTotalMoney}>Proceed to checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListProduct