import "./single.scss";
import List from "../../Components/table/Table.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({})
  useEffect(() => {
    const fetch = async () => {
      const users = (await axios.get("http://localhost:8080/api/admin/allUsers")).data;
      const profile = users.data.find((user) => (user.id == id))
      setProfile(profile);
    }
    fetch();
  }, [])
  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={profile.photos}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{profile.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Rank:</span>
                  <span className="itemValue">{profile.rank?.nameRank}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{profile.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{profile.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ngày Sinh:</span>
                  <span className="itemValue">{profile.dateOfBirth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
