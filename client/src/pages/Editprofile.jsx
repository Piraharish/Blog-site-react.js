import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import ProfileLogo from "../img/profile.png";

const EditProfile = () => {
  const state = useLocation().state;
  const [userData, setUserData] = useState({
    username: state?.username || "",
    email: state?.email || "",
    mobile: state?.mobile || "",
    img:"",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/users`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imagePreview = document.getElementById("imagePreview")
        if (imagePreview) {
          imagePreview.src = event.target.result;
        }
      };
      reader.readAsDataURL(file)
      setUserData({ ...userData, img: file })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      if (userData.img instanceof File) {
        const formData = new FormData();
        formData.append('file', userData.img);
        const response = await axios.post('/upload-profile', formData,{
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });
        userData.img = response.data;
      }
      const response = await axios.put(`/users/${state?.id}`, {
        username: userData.username,
        email: userData.email,
        mobile: userData.mobile,
        img: userData.img,
      });
      navigate("/profile");
      setUserData(response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="edit">
      <br />
      <h1>Edit Profile</h1>
      <form>
        <div className="profile-container">
          <label htmlFor="profilePictureInput">
            <div>
            {userData.img ? (
              <img id="imagePreview" src={`/profile/${userData.img}?`} alt="" />
            ) : (
              <img src={ProfileLogo} alt="" />
            )}
            </div>
          </label>
          <input
            type="file"
            accept="image/*"
            name="profilePicture"
            id="profilePictureInput"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
        />
        <input
          required
          type="tel"
          placeholder="Phone"
          name="mobile"
          value={userData.mobile || ""}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving Changes..." : "Save"}
        </button>
        <span>
          <Link to="/">Change Password</Link>
        </span>
      </form>
    </div>
  );
};

export default EditProfile;
