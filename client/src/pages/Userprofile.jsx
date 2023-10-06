import React, { useEffect, useState, } from "react";
import axios from "axios";
import ProfileLogo from "../img/profile.png";
import { useNavigate } from "react-router-dom";

const UserProfile = () =>{
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, []);

  const handleEditButtonClick = () => {
    navigate("/edit-profile") 
  };
  
  return (
    <div className="userprofile">
      <div className="profile-container">
        <div className="profile-card">
          {user.img ? (
              <img src={`/profile/${user.img}`} alt="" />
            ) : (
              <img src= { ProfileLogo } alt="" />
            )}
          <h5>{user.username}</h5>
          <div className="profile-stats">
            <div>
              <p className="stat-label">Blogs</p>
              <p className="stat-value">{user.postCount || "0"}</p>
            </div>
            <div>
              <p className="stat-label">Drafts</p>
              <p className="stat-value">{user.draftCount || "0"}</p>
            </div>
            <div>
              <p className="stat-label">Followers</p>
              <p className="stat-value">{user.followers || "0"}</p>
            </div>
            <div>
              <p className="stat-label">Following</p>
              <p className="stat-value">{user.following || "0"}</p>
            </div>
          </div>
          <h6>Details</h6>
          <p><b>_____________________________________</b></p>
          <div className="info-row">
            <div className="info-label"><b>Email</b> {user.email || "Not found"}</div>
          </div>
          <div className="info-row">
            <div className="info-label"><b>Phone</b> {user.mobile || "Not found"}</div>
          </div>
          <button className="edit-button" onClick={handleEditButtonClick}>Edit</button>
        </div>       
        {/* <div className="social-icons">
          <a href="#!"><i className="fa fa-facebook me-3" /></a>
          <a href="#!"><i className="fa fa-twitter me-3" /></a>
          <a href="#!"><i className="fa fa-instagram me-3" /></a>
        </div> */}
      </div>
    </div>
  );
}
export default UserProfile;