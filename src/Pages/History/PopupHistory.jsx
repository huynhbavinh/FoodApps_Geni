import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from "reactstrap";
import { useAuth } from '../../Context/AuthContext.jsx';
import axios from 'axios';

function PopupHistoryDetails({ show, setShow, id }) {
    const { user } = useAuth();
    const [order, setOrder] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const data = (await axios.get(`http://localhost:8080/api/history/showItemsOfOrder?idOfOrder=${id}`, {
                'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
            })).data
            setOrder(data)
        }
        fetch();
    }, [])
    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="history-page">
                            <h4>You have {order.length} items</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.map(items => (
                                            <tr key={items.id}>
                                                <td><img src={items.photos} /></td>
                                                <td>{items.name}</td>
                                                <td>{items.price} $</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PopupHistoryDetails;