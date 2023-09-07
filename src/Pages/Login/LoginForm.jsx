import React, { Component, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import { Col } from 'reactstrap';
import wallpaper from '../../Assets/images/SignUp-wallpaper.jpg'
import { useAuth } from '../../Context/AuthContext.jsx';
import Alert from '../../Components/popup/alert.jsx';
function Login () {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {login, isAuthenticated, user, error } = useAuth();

    useEffect(() => {
        if (isAuthenticated && (user && user.data.roles[0] === 'ADMIN')){
            navigate('/dashboard')
        } else if (isAuthenticated || localStorage.getItem('user')) {
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
                        {
                            error && <p style={{color: "red" }}>Wrong username or password</p>
                        }

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            Do not have an account, <a href="/signup">Register</a> ?
                        </p>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
export default Login
