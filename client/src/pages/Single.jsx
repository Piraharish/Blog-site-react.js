import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import ProfileLogo from "../img/profile.png";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const isCurrentUser = post.username === currentUser.username;

  const userProfileLink = isCurrentUser
    ? `/profile`
    : `/profile/${post.username}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log("Error fetching post data:",err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  const userIsLoggedIn = currentUser !== null;
  if (userIsLoggedIn) {
    return (
      <div className="single">
        <div className="content">
          <img src={`../upload/${post?.img}`} alt="" />
          <div className="user">
            <Link to={userProfileLink}>
            {post.userImg ? (
              <img src={`/profile/${post.userImg}`} alt="" />
            ) : (
              <img src= { ProfileLogo } alt="" />
            )}
            </Link>
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          ></p>
          </div>
        <Menu cat={post.cat}/>
      </div>
    );
  }
  else {
    return (
      <div className="login">
        <div className="links">
        <Link className="link" to="/login"><h6>LOGIN TO READ</h6></Link>
        </div>
      </div>
    );
  }
};

export default Single;
