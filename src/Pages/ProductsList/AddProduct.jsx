import "./AddProduct.scss";
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Navbar from "../../Components/navbar/Navbar.jsx";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import axios from "axios";
const apiURL ='http://localhost:8080/api/product/addFood'

const AddProduct = ({ inputs, title }) => {
  const {user} = useAuth();
  const[newProduct,setNewProduct]  = useState({
    Product:"",
    Type:'',
    Description:"",
    Status:"",
    Price:"",
    Category:"",
  })
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setNewProduct((prev) => {
      return {...prev, [name]: value};
    });
  };
  const config = {
    headers: { Authorization: `Bearer ${user.data.accessToken}` }
  };
  const addMenu = async() => {
    const formData = new FormData();
    formData.append('name', newProduct.Product);
    formData.append('description', newProduct.Description);
    formData.append('numberFood', 5);
    formData.append('categoryId', newProduct.Category);
    formData.append('image', selectedFile );
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
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
              <Link to="" style={{ textDecoration: "none"} }><button type="button">Cancel</button></Link>
              <Link to="" style={{ textDecoration: "none" }}><button type="button" onClick={addMenu}>Create</button></Link>
                
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
