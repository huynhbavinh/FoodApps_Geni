import "./AddProduct.scss";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Navbar from "../../Components/navbar/Navbar.jsx";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import Form from 'react-bootstrap/Form';
import axios from "axios";

const AddProduct = ({ inputs, title }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newProduct, setNewProduct] = useState({
    Product: "",
    Type: '',
    Description: "",
    Status: "",
    Price: "",
    Category: "",
  })
  const [dataCate, setDataCate] = useState([]);
  const [dataStat, setDataStat] = useState(['AVAILABLE']);
  const [cateChange, setCateChange] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const config = {
    headers: {
      Authorization: `Bearer ${user.data.accessToken}`,
      "Access-Control-Allow-Origin": "*",
    }
  };
  const addMenu = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.Product);
    formData.append('description', newProduct.Description);
    formData.append('numberFood', 5);
    formData.append('categoryId', cateChange);
    formData.append('image', selectedFile);
    formData.append('type', 'test');
    formData.append('price', newProduct.Price);
    formData.append('status', dataStat);

    await axios.post('http://localhost:8080/api/product/addFood', formData, config)
      .then(response => {
        console.log('Product created successfully:', response.data);
        navigate('/products')
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  }
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState()
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    axios.get('http://localhost:8080/api/category/allCategory', {
      headers: { Authorization: `Bearer ${user.data.accessToken}` }
    }).then((res) => {
      setDataCate(res.data.data);
    })
  }, []);
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                selectedFile
                  ? preview
                  : "https:icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={onSelectFile}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input name={input.label} autoComplete="off" type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
                <div className="bottom d-block">
                  <div className="d-flex justify-content-between align-items-center" style={{width: '700px'}}>
                    <p className="m-0">Category:</p>
                    <Form.Select style={{'margin-right': '99px'}} onChange={(e) => { setCateChange(e.target.value) }} aria-label="Default select example">
                      {dataCate.map(i => <option value={i.id_Category}>{i.name_category}</option>)}
                    </Form.Select>

                    <p className="m-0">Status:</p>
                    <Form.Select onChange={(e) => { setDataStat(e.target.value) }} aria-label="Default select example">
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="DISABLE">DISABLE</option>
                    </Form.Select>
                  </div>
                </div>
                <div>
                  <button type="button" style={{ margin: '5px' }} onClick={ () => {navigate('/products')}}>Cancel</button>
                  <button type="button" onClick={addMenu}>Create</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
