import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext.jsx"
import "../../styles/product-card.css"

import { Link } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ProductCard = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { user, setTotalCart } = useAuth();
  const { id, name, price, photos } = props.item;
  const handleAddCart = () => {
    const newItem = {
      idOfCus: user.data.id,
      idOfPro: id,
      quantity: 1
    }
    axios.post("http://localhost:8080/api/cart/addCart", newItem, {
      'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
    }).then(() => {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '0')
      } else {
        const numb = parseInt(localStorage.getItem('cart')) + 1;
        localStorage.setItem('cart', numb.toString())
        setTotalCart(numb)
      }
      setShow(true)
    });
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={photos} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{name}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">${price}</span>
          <button className="addTOCart__btn" onClick={() => { handleAddCart() }}>
            Add to Cart
          </button>
        </div>
      </div>
      {show && <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are adding it to cart!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK!
          </Button>
        </Modal.Footer>
      </Modal>}
    </div>
  );
};

export default ProductCard;
