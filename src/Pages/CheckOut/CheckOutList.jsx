import "./list.scss"

import Carts from "./CheckOut.jsx";
import FormCheckOut from "./FormCheckOut.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext.jsx";

const CheckOutList = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [carts, setCart] = useState(0);
  const { user } = useAuth()

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
  }, [])
  return (
    <Container fluid>
      <Row>
        <Col xs={6}><Carts items={carts} /></Col>
        <Col><FormCheckOut /></Col>
      </Row>
    </Container>
  )
}

export default CheckOutList