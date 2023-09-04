import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
// import { cartActions } from "../store/shopping-cart/cartSlice";
import pic from '../../Assets/images/bread(1).png'
import "../../styles/product-details.css";
// import ProductCard from "../components/UI/product-card/ProductCard";
const FoodDetails = () => {
    const [tab, setTab] = useState("desc");
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [reviewMsg, setReviewMsg] = useState("");
    const [food, setFood] = useState();
    const [allFood, setAllFoods] = useState([]);
    const { id } = useParams();
    const submitHandler = (e) => {
        console.log(enteredName, enteredEmail, reviewMsg);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // useEffect(() => {

    //     axios.get("http://localhost:8080/auth/showFood/id/?id=" + id).then((data) => {
    //         setFood(data.data);
    //         console.log(data.data)
    //     })
    // }, []); // TODO

    const addItem = () => {
        // insert axios post
    };
    return (
        <Container>
            <Row>
                <Col lg="2" md="2">
                    <div className="product__images ">
                        <div
                            className="img__item"
                        >
                            <img src={pic} alt="" className="w-50" />
                        </div>
                    </div>
                </Col>
                <Col lg="6" md="6">
                    <div className="single__product-content">
                        <h2 className="product__title mb-3">{'food.name'}</h2>
                        <p className="product__price">
                            {" "}
                            Price: <span>${'food.price'}</span>
                        </p>
                        <p className="category mb-5">
                            Category: <span>{'food.type'}</span>
                        </p>
                        <button onClick={addItem} className="addTOCart__btn">
                            Add to cart
                        </button>
                    </div>
                </Col>

                <Col lg="12">
                    <div className="tabs d-flex align-items-center gap-5 py-3">
                        <h6
                            className={` ${tab === "desc" ? "tab__active" : ""}`}
                            onClick={() => setTab("desc")}
                        >
                            Description
                        </h6>
                        <h6
                            className={` ${tab === "rev" ? "tab__active" : ""}`}
                            onClick={() => setTab("rev")}
                        >
                            Review
                        </h6>
                    </div>

                    {tab === "desc" ? (
                        <div className="tab__content">
                            <p>{'food.description'}</p>
                        </div>
                    ) : (
                        <div className="tab__form mb-3">
                            <div className="review pt-5">
                                <p className="user__name mb-0">Jhon Doe</p>
                                <p className="user__email">jhon1@gmail.com</p>
                                <p className="feedback__text">great product</p>
                            </div>

                            <div className="review">
                                <p className="user__name mb-0">Jhon Doe</p>
                                <p className="user__email">jhon1@gmail.com</p>
                                <p className="feedback__text">great product</p>
                            </div>

                            <div className="review">
                                <p className="user__name mb-0">Jhon Doe</p>
                                <p className="user__email">jhon1@gmail.com</p>
                                <p className="feedback__text">great product</p>
                            </div>
                            <form className="form" onSubmit={submitHandler}>
                                <div className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        onChange={(e) => setEnteredName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form__group">
                                    <input
                                        type="text"
                                        placeholder="Enter your email"
                                        onChange={(e) => setEnteredEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form__group">
                                    <textarea
                                        rows={5}
                                        type="text"
                                        placeholder="Write your review"
                                        onChange={(e) => setReviewMsg(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="addTOCart__btn">
                                    Submit
                                </button>
                            </form>
                        </div>
                    )}
                </Col>

                <Col lg="12" className="mb-5 mt-4">
                    <h2 className="related__Product-title">You might also like</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default FoodDetails;
