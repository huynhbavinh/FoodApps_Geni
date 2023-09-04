import React, { Component } from 'react'
import { Container, Row } from "react-bootstrap";
import { Col } from 'reactstrap';
import wallpaper from '../../Assets/images/SignUp-wallpaper.jpg'

export default class Login extends Component {
    render() {
        return (
            <Container fluid style={{
                backgroundImage: `url(${wallpaper})`,
                height: '100vh',
            }}>
                <Row>
                    <Col className="d-flex flex-fill justify-content-center p-5 my-5 bg-light bg-opacity-75 text-dark rounded shadow-lg">
                        <form style={{width: '25%'}}>
                            <h3>Sign In</h3>

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

                            <div className="mb-3">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                    />
                                    <label className="custom-control-label" htmlFor="customCheck1"> 
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <p className="forgot-password text-right">
                                Forgot <a href="#">password?</a>
                            </p>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
