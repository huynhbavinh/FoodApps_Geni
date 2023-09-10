import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import heroImg from "../../Assets/images/hero.png"
import "../../styles/hero-section.css";

import { Link } from "react-router-dom";

import Category from "../../Components/Category.jsx";

import "../../styles/home.css";
import featureImg01 from "../../Assets/images/service-01.png";
import featureImg02 from "../../Assets/images/service-02.png";
import featureImg03 from "../../Assets/images/service-03.png";
import foodCategoryImg01 from "../../Assets/images/hamburger.png";
import foodCategoryImg02 from "../../Assets/images/pizza.png";
import foodCategoryImg03 from "../../Assets/images/bread.png";

import ProductCard from "../../Pages/Products/ProductCard.jsx";
import whyImg from "../../Assets/images/location.png";
import networkImg from "../../Assets/images/network.png";
import { useAuth } from "../../Context/AuthContext.jsx";

const featureData = [
    {
        title: "Quick Delivery",
        imgUrl: featureImg01,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
    },

    {
        title: "Super Dine In",
        imgUrl: featureImg02,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
    },
    {
        title: "Easy Pick Up",
        imgUrl: featureImg03,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
    },
];

const HomePage = () => {
    const [category, setCategory] = useState("All");
    const [foods, setFoods] = useState([]);
    const [allProducts, setAllProducts] = useState(foods);
    const {isAuthenticated} = useAuth()
    useEffect(() => {
        axios.get("http://localhost:8080/auth/showFood").then((data) => {
            setFoods(data.data);
        })
        if (category === "All") {
            setAllProducts(foods);
        }

        if (category === "Food") {
            const filteredProducts = foods.filter(
                (item) => item.category?.name === "Food"
            );

            setAllProducts(filteredProducts);
        }
        if (category === "Drink") {
            const filteredProducts = foods.filter(
                (item) => item.category?.name === "Drink"
            );

            setAllProducts(filteredProducts);
        }
        if (category === "Others") {
            const filteredProducts = foods.filter(
                (item) => item.category?.name === "Others"
            );

            setAllProducts(filteredProducts);
        }
    }, [category]);

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6">
                            <div className="hero__content  ">
                                <h5 className="mb-3">Easy way to make an order</h5>
                                <h1 className="mb-4 hero__title">
                                    <span>HUNGRY?</span> Just wait <br /> food at
                                    <span> your door</span>
                                </h1>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                                    magni delectus tenetur autem, sint veritatis!
                                </p>

                                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                                    <Link to="/cart">
                                        <button className="order__btn d-flex align-items-center justify-content-between">
                                            Order now <i class="ri-arrow-right-s-line"></i>
                                        </button>
                                    </Link>
                                    

                                    <button className="all__foods-btn">
                                        <Link to="/foods">See all foods</Link>
                                    </button>
                                </div>

                                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                                    <p className=" d-flex align-items-center gap-2 ">
                                        <span className="shipping__icon">
                                            <i class="ri-car-line"></i>
                                        </span>{" "}
                                        No shipping charge
                                    </p>

                                    <p className=" d-flex align-items-center gap-2 ">
                                        <span className="shipping__icon">
                                            <i class="ri-shield-check-line"></i>
                                        </span>{" "}
                                        100% secure checkout
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col lg="6" md="6">
                            <div className="hero__img">
                                <img src={heroImg} alt="hero-img" className="w-100" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Category />
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h5 className="feature__subtitle mb-4">What we serve</h5>
                            <h2 className="feature__title">Just sit back at home</h2>
                            <h2 className="feature__title">
                                we will <span>take care</span>
                            </h2>
                            <p className="mb-1 mt-4 feature__text">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                                officiis?
                            </p>
                            <p className="feature__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Aperiam, eius.{" "}
                            </p>
                        </Col>

                        {featureData.map((item, index) => (
                            <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                                <div className="feature__item text-center px-5 py-3">
                                    <img
                                        src={item.imgUrl}
                                        alt="feature-img"
                                        className="w-25 mb-3"
                                    />
                                    <h5 className=" fw-bold mb-3">{item.title}</h5>
                                    <p>{item.desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2>Popular Foods</h2>
                        </Col>

                        <Col lg="12">
                            <div className="food__category d-flex align-items-center justify-content-center gap-4">
                                <button
                                    className={`all__btn  ${category === "All" ? "foodBtnActive" : ""
                                        } `}
                                    onClick={() => setCategory("All")}
                                >
                                    All
                                </button>
                                <button
                                    className={`d-flex align-items-center gap-2 ${category === "Food" ? "foodBtnActive" : ""
                                        } `}
                                    onClick={() => setCategory("Food")}
                                >
                                    <img src={foodCategoryImg01} alt="" />
                                    Food
                                </button>

                                <button
                                    className={`d-flex align-items-center gap-2 ${category === "Drink" ? "foodBtnActive" : ""
                                        } `}
                                    onClick={() => setCategory("Drink")}
                                >
                                    <img src={foodCategoryImg02} alt="" />
                                    Drink
                                </button>

                                <button
                                    className={`d-flex align-items-center gap-2 ${category === "Others" ? "foodBtnActive" : ""
                                        } `}
                                    onClick={() => setCategory("Others")}
                                >
                                    <img src={foodCategoryImg03} alt="" />
                                    Others
                                </button>
                            </div>
                        </Col>
                        {allProducts.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section className="why__choose-us">
                <Container>
                    <Row>
                        <Col lg="6" md="6">
                            <img src={whyImg} alt="why-tasty-treat" className="w-100" />
                        </Col>

                        <Col lg="6" md="6">
                            <div className="why__tasty-treat">
                                <h2 className="tasty__treat-title mb-4">
                                    Why <span>Tasty Treat?</span>
                                </h2>
                                <p className="tasty__treat-desc">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Dolorum, minus. Tempora reprehenderit a corporis velit,
                                    laboriosam vitae ullam, repellat illo sequi odio esse iste
                                    fugiat dolor, optio incidunt eligendi deleniti!
                                </p>

                                <ListGroup className="mt-4">
                                    <ListGroupItem className="border-0 ps-0">
                                        <p className=" choose__us-title d-flex align-items-center gap-2 ">
                                            <i class="ri-checkbox-circle-line"></i> Fresh and tasty
                                            foods
                                        </p>
                                        <p className="choose__us-desc">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                            Quia, voluptatibus.
                                        </p>
                                    </ListGroupItem>

                                    <ListGroupItem className="border-0 ps-0">
                                        <p className="choose__us-title d-flex align-items-center gap-2 ">
                                            <i class="ri-checkbox-circle-line"></i> Quality support
                                        </p>
                                        <p className="choose__us-desc">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Qui, earum.
                                        </p>
                                    </ListGroupItem>

                                    <ListGroupItem className="border-0 ps-0">
                                        <p className="choose__us-title d-flex align-items-center gap-2 ">
                                            <i class="ri-checkbox-circle-line"></i>Order from any
                                            location{" "}
                                        </p>
                                        <p className="choose__us-desc">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Qui, earum.
                                        </p>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section>
                <Container>
                    <Row>
                        <Col lg="6" md="6">
                            <div className="testimonial ">
                                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                                <h2 className="testimonial__title mb-4">
                                    What our <span>customers</span> are saying
                                </h2>
                                <p className="testimonial__desc">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Distinctio quasi qui minus quos sit perspiciatis inventore
                                    quis provident placeat fugiat!
                                </p>

                            </div>
                        </Col>

                        <Col lg="6" md="6">
                            <img src={networkImg} alt="testimonial-img" className="w-100" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default HomePage;
