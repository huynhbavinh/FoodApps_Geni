import "./AddProduct.scss";
import { productInputs } from "../../Components/structure/formSource.js"
import Sidebar from "../../Components/sidebar/Sidebar.jsx";
import Navbar from "../../Components/navbar/Navbar.jsx";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import axios from "axios";
import Form from 'react-bootstrap/Form';
const apiEdit = 'http://localhost:8080/api/product/EditFood'
const SingleProduct = () => {
  const navigate = useNavigate();
  let item
  const [singleProduct, setSingleProduct] = useState({});
  const [name, setName] = useState('');
  const [dataStat, setDataStat] = useState(['AVAILABLE']);
  const [des, setDes] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [idFood, setIdFood] = useState('');
  const { id } = useParams();

  const [dataCate, setDataCate] = useState([]);
  const [cateChange, setCateChange] = useState('');
  console.log(singleProduct)
  useEffect(() => {
    axios.get('http://localhost:8080/api/category/allCategory', {
      headers: { Authorization: `Bearer ${user.data.accessToken}` }
    }).then((res) => {
      setDataCate(res.data.data);
    })
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/auth/showFood").then((data) => {
      item = data.data.find(item => item.id == id);
      setSingleProduct(item);
    }).then(() => {
      setName(item.name)
      setDataStat(item.status)
      setDes(item.description)
      setCateChange(item.category.id_Category)
      setPrice(item.price)
      setImg(item.photos)
      setIdFood(item.id)
    })
  }, []
  );
  const title = 'Create new product'
  const inputs = productInputs;
  const { user } = useAuth();

  const handleChange = (value, setter) => {
    setter(value);
  };
  const config = {
    headers: { Authorization: `Bearer ${user.data.accessToken}` }
  };
  const editMenu = async () => {
    const formData = new FormData();
    const file = await getImageFileFromUrl(img)

    formData.append('idFood', idFood);
    formData.append('name', name);
    formData.append('description', des);
    formData.append('numberFood', 5);
    formData.append('categoryId', cateChange);
    formData.append('image', selectedFile ?? file);
    formData.append('price', price);
    formData.append('status', dataStat)
    await axios.post(apiEdit, formData, config)
      .then(response => {
        console.log('Product edited successfully:', response.data);
        navigate('/products');
      })
      .catch(error => {
        console.error('Error edit product:', error);
      });
  }

  const getImageFileFromUrl = async (url) => {
    const temp = url.split('/');
    const fileName = temp[temp.length - 1]
    let response = (await axios.get(url, config)).data;
    let metadata = {
      type: "image/jpeg"
    };
    return new File([response], fileName, metadata);
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
                <input name='Product' value={name} autoComplete="off" type="text" onChange={(e) => {
                  handleChange(e.target.value, setName)
                }} />
              </div>
              <div className="formInput" key='2'>
                <label>Description</label>
                <input name='Description' value={des} autoComplete="off" type="text" onChange={(e) => {
                  handleChange(e.target.value, setDes)
                }} />
              </div>
              <div className="formInput" key={'3'}>
                <label>Price</label>
                <input name='Price' value={price} autoComplete="off" type="number" onChange={(e) => {
                  handleChange(e.target.value, setPrice)
                }} />
              </div>
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
              <button type="button" onClick={editMenu}>Edit</button>
            </div>
               {/*
               <div className="formInput" key={'4'}>
                <label>Status</label>
                <input name='Status' value={status} autoComplete="off" type="text" onChange={(e) => {
                  handleChange(e.target.value, setStatus)
                }} />
              </div>
              <div>
                <select onChange={(e) => { setCateChange(e.target.value) }}>
                  {dataCate.map(i => <option value={i.id_Category} selected={cateChange === i.id_Category}>{i.name_category}</option>)}
                </select>
              </div>
              <div>
                <button type="button" style={{margin: '5px'}}  onClick={ () => {navigate('/products')}}>Cancel</button>
                <button type="button" onClick={editMenu}>Edit</button>
              </div>
              */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
