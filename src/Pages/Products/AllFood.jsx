import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../../Pages/Products/ProductCard.jsx";
import ReactPaginate from "react-paginate";

import "../../styles/all-foods.css";
import "../../styles/pagination.css";
import axios from "axios";
const AllFoods = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [sortOption, setSortOption] = useState("Default");
    useEffect(() => {
        axios.get("http://localhost:8080/auth/showFood").then((data) => {
            setFoods(data.data);
        })
    }, []
    );
    useEffect(()=>{
      if(sortOption=="Default"){
        setFoods(foods);
        console.log(foods);
      }
       if(sortOption=="A-Z"){
         setFoods(foods.sort((a, b) =>(a, b) =>
        a.name > b.name ? 1 : -1));
       console.log(foods);
       }
      if(sortOption=="Z-A"){
        setFoods(foods.sort((a, b) => a.name > b.name ? -1 : 1));
      }
      if(sortOption=="High"){
        setFoods(foods.sort((a, b) => a.price-b.price));
      }
      if(sortOption=="Low"){
        setFoods(foods.sort((a, b) => b.price-a.price));
      }
    })
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
    const handleSort = () => {
        setSortOption()
    }
    const productPerPage = 12;
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
                        <select className="w-50">
                            <option onChange={() => setSortOption("Default")}>Default</option>
                            <option value="ascending" onChange={() => setSortOption("A-Z")}>Alphabetically, A-Z</option>
                            <option value="descending" onChange={() => setSortOption("Z-A")}>Alphabetically, Z-A</option>
                            <option value="high-price" onChange={() => setSortOption("High")}>High Price</option>
                            <option value="low-price" onChange={() => setSortOption("Low")}>Low Price</option>
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
