import React, { Component } from 'react'
import { Container, Row } from "react-bootstrap";
import { Col } from 'reactstrap';
import wallpaper from '../../Assets/images/SignUp-wallpaper.jpg'
export default class SignUp extends Component {
    render() {
        return (
            <Container fluid style={{
                backgroundImage: `url(${wallpaper})`,
                height: '100vh',
            }}>
                <Row>
                    <Col xs={7}></Col>
                    <Col md="4" className="my-5 px-3 py-3 align-items-center bg-light bg-opacity-75 text-dark rounded shadow-lg">
                        <form>
                            <h3>Sign Up</h3>

                            <div className="mb-3">
                                <label>First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                />
                            </div>

                            <div className="mb-3">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>

                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                            <p className="forgot-password text-right">
                                Already registered <a href="/sign-in">sign in?</a>
                            </p>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
