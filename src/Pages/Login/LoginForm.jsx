import React, { Component, useState, useNavigate, useEffect } from 'react'
import { Container, Row } from "react-bootstrap";
import { Col } from 'reactstrap';
import wallpaper from '../../Assets/images/SignUp-wallpaper.jpg'
import { useAuth } from '../../Context/AuthContext.jsx';
function Login () {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('')
    const {login, isAuthenticated} = useAuth();

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/home')
        }
    },
    [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName && password) {
            login(userName, password)
        }
    }
    return (
        <Container fluid style={{
            backgroundImage: `url(${wallpaper})`,
            height: '100vh',
        }}>
            <Row>
                <Col className="d-flex flex-fill justify-content-center p-5 my-5 bg-light bg-opacity-75 text-dark rounded shadow-lg">
                    <form style={{width: '25%'}} onSubmit={handleSubmit}>
                        <h3>Sign In</h3>

                        <div className="mb-3">
                            <label>User name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter email"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
export default Login
