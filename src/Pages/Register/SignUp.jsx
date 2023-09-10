import React from 'react'
import { Container, Row } from "react-bootstrap";
import { Col } from 'reactstrap';
import wallpaper from '../../Assets/images/SignUp-wallpaper.jpg'
import { useState, useEffect } from "react";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./SignUp.css";
import Alert from '../../Components/popup/alert.jsx';
import moment from 'moment/moment';
const Token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaW5oMSIsImlhdCI6MTY5Mzk1MzAyMiwiZXhwIjoxNjk0MDM5NDIyfQ.K_0GPYd__xU0F03F_7nm6xnN5s7c6mrMIVQrHozi9ME'
const apiURL = 'http://localhost:8080/auth/signup'
const config = {
  headers: { Authorization: `Bearer ${Token}` }
};


function SignUp() {
  const [showErr, setShowErr] = useState(false);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    date_of_birth: '',
    address: "",
    username: "",
    password: "",
    phoneNumber: "",
  });
  const [body, setBody] = useState('You must fill all the input');
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addMenu = async () => {
    console.log(newUser)

    const formData = new FormData(); // raw
    formData.append('name', newUser.name);
    formData.append('address', newUser.address);
    formData.append('dateOfBirth', moment(newUser.date_of_birth).format('DD/MM/yyyy')); // tu hoc di cmm
    formData.append('phoneNumber', newUser.phoneNumber);
    formData.append('image', selectedFile);
    formData.append('nameOfAccount', newUser.username);
    formData.append('password', newUser.password);
    await axios.post(apiURL, formData)
      .then(response => {
        console.log('Sign Up successfully:', response.data);
        setShow(true);
      })
      .catch(error => {
        console.error('Error Sign Up', error);
        setShowErr(true);
        if (error.response?.data.toString() == 'Error: Username is already taken!') 
        {
          setBody('Username is already taken!');
        }
        else {
          setBody('You must fill all the input');
        }
        
      }
      );
  }
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])

  }


  return (
    <Container fluid style={{
      backgroundImage: `url(${wallpaper})`,
      height: '130vh',
      'overflow-x': 'hidden',
    }}>
      <Row style={{
        'overflow-x': 'hidden',
      }}>
        <Col xs={7}></Col>
        <Col md="4" className="my-5 px-3 py-3 align-items-center bg-light bg-opacity-75 text-dark rounded shadow-lg">
          {showErr && <Alert
            title={'Error'}
            body={body}
            show={showErr}
            variant={'danger'}
            setShow={setShowErr} />}
          {show && <Alert
            title={'Welcome'}
            body={'Sign up successfully'}
            show={show}
            setShow={setShow}
            variant={'success'}
            navigateTo={'/login'} />}
          <form>
            <h3>Sign Up</h3>
            <div className="mb-3" >
              <img
                src={
                  selectedFile
                    ? preview
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="" width="100px"
              />
              <span>
                <label htmlFor="file">
                  Upload your avatar: <DriveFolderUploadOutlinedIcon className="iconUpload" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={onSelectFile}
                  style={{ display: "none" }}
                />
              </span>
            </div>
            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                name='name'
                onChange={handleChange}

              />
            </div>

            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name='username'
                onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                name="address"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter Birthday"
                name="date_of_birth"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="number"
                placeholder="123-1234567"
                pattern="[0-9]{10}"
                className="form-control"
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
            </div>
            <div className="d-grid">
              <button type="button" className="btn btn-primary" onClick={addMenu}>
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/login">sign in?</a>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  )
}
export default SignUp;