import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileLogo from "../img/profile.png";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [customImageSelected, setCustomImageSelected] = useState(false);
  const [profilePictureFormData, setProfilePictureFormData] = useState(null);
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      console.log("File selected:", file);
      
      const formData = new FormData();
      formData.append("profilePicture", file);

      setProfilePictureFormData(formData);
      console.log("Updated profilePictureFormData:", formData);
      setCustomImageSelected(true);

      setInputs((prevInputs) => ({
        ...prevInputs,
        [e.target.name]: file,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [e.target.name]: e.target.value,
      }));
    }
    console.log("Updated state:", inputs);
    setError(null);
  };  

  useEffect(() => {
    if (inputs.profilePicture) {
      // Update the profile image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const imagePreview = document.getElementById("imagePreview");
        if (imagePreview) {
          imagePreview.src = event.target.result;
        }
      };
      reader.readAsDataURL(inputs.profilePicture);
    }
  }, [inputs.profilePicture]);

  const upload = async (file) => {
    if (!file) {
      return null;
    }
    try {
      const profile = inputs.profilePicture
      const formData = new FormData();
      formData.append("file", profile);
      const response = await axios.post("/upload-profile", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        console.log("Response Data:",response.data);
        return response.data;
      }
      
    } catch (err) {
      console.error("Error uploading image:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imgUrl = await upload(profilePictureFormData);
      const formData = new FormData();

      formData.append("username", inputs.username);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      formData.append("profilePicture", imgUrl);

      await axios.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
      console.error("Error in Form data:", err);
    }
    setIsLoading(false);
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <div className="profile-container">
          <label htmlFor="profilePictureInput">
            <div>
              <img
                id="imagePreview"
                src= {customImageSelected ? URL.createObjectURL(inputs.profilePicture) : ProfileLogo}
                alt="Profile Preview"
              />
            </div>
          </label>
          <input
            type="file"
            accept="image/*"
            name="profilePicture"
            id="profilePictureInput"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        {err && <p>Error Code: {err.code}</p>}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
