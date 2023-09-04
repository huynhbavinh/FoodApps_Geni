import React from "react";

import "../../styles/product-card.css"

import { Link } from "react-router-dom";

import axios  from "axios";
const ProductCard = (props) => {
  const {id, name, price, picture} = props.item;
  const items =JSON.parse(window.localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${items.accessToken}` }
  };
  const addToCart = () => {
    const newItem={idOfCus:items.id,
    idOfPro:id,
    quantity:1}
    axios.post("http://localhost:8080/api/cart/addCart",newItem, config);
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={picture} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{name}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">${price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
