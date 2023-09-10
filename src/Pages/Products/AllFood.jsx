import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import ProductCard from "../../Pages/Products/ProductCard.jsx";
import ReactPaginate from "react-paginate";

import "../../styles/all-foods.css";
import "../../styles/pagination.css";
import axios from "axios";

import foodCategoryImg01 from "../../Assets/images/hamburger.png";
import foodCategoryImg02 from "../../Assets/images/pizza.png";
import foodCategoryImg03 from "../../Assets/images/bread.png";


const AllFoods = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');
    useEffect(() => {
        axios.get("http://localhost:8080/auth/showFood").then((data) => {
            setFoods(data.data);
        })
    }, [])

    const handleChangeCategory = category => {
        let filteredProducts;
        switch (category) {
            case 'All':
                setFoods(foods);
                setSelectedCategory('All')
                break;
            case 'Food':
                filteredProducts = foods.filter(
                    (item) => item.category?.name === "Food"
                );
                setFoods(filteredProducts);
                setSelectedCategory('Food')
                break;
            case 'Drink':
                filteredProducts = foods.filter(
                    (item) => item.category?.name === "Drink"
                );
                setFoods(filteredProducts);
                setSelectedCategory('Drink')
                break;
            case 'Others':
                filteredProducts = foods.filter(
                    (item) => item.category?.name === "Others"
                );
                setFoods(filteredProducts);
                setSelectedCategory('Others')
                break;
            default:
                console.log('Unknown category');
        }
    }

    const handleSortOptionChange = (sortOption) => {
        if (sortOption === "HIGH") {
            setFoods(foods.sort((a, b) => a.price - b.price));
        } else if (sortOption === "LOW") {
            setFoods(foods.sort((a, b) => b.price - a.price));
        } else {
            setFoods(foods);
        }
    }

    const searchedProduct = foods.filter((item) => {
        if (searchTerm.value === "") {
            return item;
        }
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
        } else {
            return console.log("not found");
        }
    });

    const productPerPage = 8;
    const visitedPage = pageNumber * productPerPage;
    const displayPage = searchedProduct.slice(
        visitedPage,
        visitedPage + productPerPage
    );

    const pageCount = Math.ceil(searchedProduct.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <Container>
            <Col lg="12">
                <div className="food__category d-flex align-items-center justify-content-center gap-4">
                    <button
                        className={`all__btn  ${selectedCategory === "All" ? "foodBtnActive" : ""
                            } `}
                        onClick={() => handleChangeCategory("All")}
                    >
                        All
                    </button>
                    <button
                        className={`d-flex align-items-center gap-2 ${selectedCategory === "Food" ? "foodBtnActive" : ""
                            } `}
                        onClick={() => handleChangeCategory("Food")}
                    >
                        <img src={foodCategoryImg01} alt="" />
                        Food
                    </button>

                    <button
                        className={`d-flex align-items-center gap-2 ${selectedCategory === "Drink" ? "foodBtnActive" : ""
                            } `}
                        onClick={() => handleChangeCategory("Drink")}
                    >
                        <img src={foodCategoryImg02} alt="" />
                        Drink
                    </button>

                    <button
                        className={`d-flex align-items-center gap-2 ${selectedCategory === "Others" ? "foodBtnActive" : ""
                            } `}
                        onClick={() => handleChangeCategory("Others")}
                    >
                        <img src={foodCategoryImg03} alt="" />
                        Others
                    </button>
                </div>
            </Col>
            <Row>
                <Col lg="6" md="6" sm="6" xs="12">
                    <div className="search__widget d-flex align-items-center justify-content-between ">
                        <input
                            type="text"
                            placeholder="I'm looking for...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span>
                            <i class="ri-search-line"></i>
                        </span>
                    </div>
                </Col>
                <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                    <div className="sorting__widget text-end">
                        <select className="w-50" onChange={(e) => { handleSortOptionChange(e.target.value.toUpperCase()); }}>
                            <option >Default</option>
                            <option value="high">High Price</option>
                            <option value="low">Low Price</option>
                        </select>
                    </div>
                </Col>

                {displayPage.map((item) => (
                    <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                        <ProductCard item={item} />
                    </Col>
                ))}

                <div>
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={changePage}
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        containerClassName=" paginationBttns "
                    />
                </div>
            </Row>
        </Container>
    );
};

export default AllFoods;
