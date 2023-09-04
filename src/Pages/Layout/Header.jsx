import React, { useRef, useEffect, useState } from "react";
import logo from "../../Assets/res-logo.png";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";

import "../../styles/header.css";

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
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const [name, setName] = useState("");

    const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
    useEffect(() => {
        const items = JSON.parse(window.localStorage.getItem("user"));
        if (items != null) {
            setName(items.name);
        }
    })
    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <h5>Tasty Treat</h5>
                    </div>

                    {/* ======= menu ======= */}
                    <div className="navigation" ref={menuRef}>
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
                    <div className="nav__right d-flex align-items-center gap-4">
                        <span className="cart__icon">
                            <i className="ri-shopping-basket-line"></i>
                            <span className="cart__badge">{'test'}</span>
                        </span>

                        <span className="user">
                            {name != "" ? <i className="ri-user-line"> {name} </i> : <Link to="/login">
                                <i className="ri-user-line"></i>
                            </Link>
                            }
                        </span>
                        <span className="mobile__menu">
                            <i className="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
