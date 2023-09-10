import "./AddProduct.scss";
import { productInputs } from "../../Components/structure/formSource.js"
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Navbar from "../../Components/navbar/Navbar.jsx";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import axios from "axios";
const apiURL = 'http://localhost:8080/api/product/addFood'

const SingleProduct = () => {
  let item
  const [singleProduct, setSingleProduct] = useState({});
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [des, setDes] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:8080/auth/showFood").then((data) => {
      item = data.data.find(item => item.id == id);
      setSingleProduct(item);
      console.log(item);
    }).then(() => {
      setName(item.name)
      setStatus(item.status)
      setDes(item.description)
      setCategory(item.category.name)
      setPrice(item.price)
    })
  }, []
  );
  const title = 'Create new product'
  const inputs = productInputs;
  const { user } = useAuth();
  const [newProduct, setNewProduct] = useState({
    Product: "",
    Type: '',
    Description: "",
    Status: "",
    Price: "",
  })
  const handleChange = (value, setter) => {
    setter(value);
  };
  const config = {
    headers: { Authorization: `Bearer ${user.data.accessToken}` }
  };
  const addMenu = async () => {
    const formData = new FormData();
    formData.append('Name', newProduct.Product);
    formData.append('description', newProduct.Description);
    formData.append('numberFood', 5);
    formData.append('id_Category', 1);
    formData.append('image', selectedFile);
    formData.append('price', newProduct.Price);
    formData.append('status', newProduct.Status)
    await axios.post(apiURL, formData, config)
      .then(response => {
        console.log('Product created successfully:', response.data);
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
                  : singleProduct.photos
              }
              alt="avatar"
            />
            <div >
            </div>
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
              <div className="formInput" key='1'>
                <label>Product</label>
                <input name='Product' value={name} autoComplete="off" type="text" onChange={(e)=> {
                  handleChange(e.target.value, setName)
                }} />
              </div>
              <div className="formInput" key='2'>
                <label>Description</label>
                <input name='Description' value={des} autoComplete="off" type="text" onChange={(e)=> {
                  handleChange(e.target.value, setDes)
                }} />
              </div>
              <div className="formInput" key='3'>
                <label>Category</label>
                 {/* <input name='Category' value={singleProduct.category?.name || 'None Category'} */}
                <input name='Category' value={category || 'None Category'} 
                autoComplete="off" type="text" onChange={(e)=> {
                  handleChange(e.target.value, setCategory) 
                }}  />
              </div>
              <div className="formInput" key={'4'}>
                <label>Status</label>
                <input name='Status' value={status} autoComplete="off" type="text" onChange={(e)=> {
                  handleChange(e.target.value, setStatus)
                }} />
              </div>
              <div className="formInput" key={'5'}>
                <label>Price</label>
                <input name='Price' value={price} autoComplete="off" type="number" onChange={(e)=> {
                  handleChange(e.target.value, setPrice) 
                }} />
              </div>
              <Link to="" style={{ textDecoration: "none" }}><button type="button">Cancel</button></Link>
              <Link to="" style={{ textDecoration: "none" }}><button type="button" onClick={addMenu}>Create</button></Link>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
