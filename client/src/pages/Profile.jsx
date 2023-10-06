import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileLogo from "../img/profile.png";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    postCount: "0",
    img: "",
  });
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${username}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, [username]); 

  return (
    <div className="profile-card">
      <div className="profile-info">
          {user.img ? (
              <img src={`/profile/${user.img}`} alt="" />
              ) : (
              <img src={ProfileLogo} alt="" />
          )}
          <div className="profile-details">
            <h2>{user.username}</h2>
            <p>Blogger</p>
            <div className="profile-stats">
              <div>
                <p className="stat-label">Blogs</p>
                <p className="stat-value">{user.postCount}</p>
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
            <div className="profile-actions">
              <button className="chat-button"><b>Chat</b></button>
              <button className="follow-button"><b>Follow</b></button>
            </div>
          </div>
        </div>
      </div>  
  );
};
export default Profile;
