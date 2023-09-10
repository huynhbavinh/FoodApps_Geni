import React, { useEffect, useRef, useState } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import logo from "../../Assets/res-logo.png";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import "../../styles/header.css";
import { useAuth } from '../../Context/AuthContext.jsx';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const menuItems = [
    {
        display: "Home",
        path: "/home",
    },
    {
        display: "Foods & Drink",
        path: "/foods",
    },
    {
        display: "Cart",
        path: "/cart",
    },
    {
        display: "Contact",
        path: "/contact",
    },
];

const Header = () => {
    const navigate = useNavigate()
    const { logout, user, isAuthenticated, totalCart, setTotalCart } = useAuth();
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
    const handleLogOut = () => {
        logout()
    }

    useEffect(() => {
        if (user) {
            let total = 0;
            const fetch = async () => {
            const carts = (await axios.get(`http://localhost:8080/api/cart/cart?idUser=${user.data.id}`,{
                'headers': { 'Authorization': `Bearer ${user.data.accessToken}` }
            })).data;
            carts.forEach(i => {
                total += parseInt(i.quantity)
            })
            setTotalCart(total);
        }
        fetch();
    } 
    }, [])

//useEffect(() => {
// window.addEventListener("scroll", () => {
//     if (
//     document.body.scrollTop > 80 ||
//     document.documentElement.scrollTop > 80
//     ) {
//     headerRef.current.classList.add("header__shrink");
//     } else {
//     headerRef.current.classList.remove("header__shrink");
//     }
// });
// return () => window.removeEventListener("scroll");
// }, []);

return (
    <header className="header" ref={headerRef}>
        <Container>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <h5>Tasty Treat</h5>
                </div>

                {/* ======= menu ======= */}
                <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                    <div className="menu d-flex align-items-center gap-5">
                        {menuItems.map((item, index) => (
                            <NavLink
                                to={item.path}
                                key={index}
                                className={(navClass) =>
                                    navClass.isActive ? "active__menu" : ""
                                }
                            >
                                {item.display}
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* ======== nav right icons ========= */}
                {isAuthenticated ?
                    <div className="nav__right d-flex align-items-center gap-4">
                        <span className="cart__icon">
                            <Link to="/cart" >
                                <i class="ri-shopping-basket-line"></i>
                                <span>{totalCart} Sản phẩm</span>
                            </Link>
                        </span>

                        <span className="user">
                            <i class="ri-user-line" onClick={() => { navigate(`users/${user.data.id}`) }}>hello, {user.data.username}</i>
                        </span>
                        <button type="button" class="btn btn-outline-dark btn-sm" onClick={logout}>Log out</button>
                    </div>
                    :
                    <div className="nav__right d-flex align-items-center gap-4">
                        {localStorage.getItem('user')
                            ? <span className="user">
                                <Link to="/" onClick={() => { handleLogOut() }}>Log Out</Link>
                            </span>
                            : <span className="user">
                                <Link to="/login">
                                    Log in
                                </Link>
                            </span>}
                    </div>
                }
            </div>
        </Container>
    </header>
);
};

export default Header;