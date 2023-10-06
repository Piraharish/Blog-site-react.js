import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Drafts = () => {
  const [myPosts, setMyPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/myPosts`,);
        // console.log("Draft data:", res.data); 
        setMyPosts(res.data.data);
      } catch (err) {
        console.log("Error:",err);
      }
    };
    fetchData();
  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {Array.isArray(myPosts) && myPosts.length > 0 ? (
          myPosts.map((myPosts) => (
            <div className="post" key={myPosts.id}>
              <div className="img">
                {myPosts.img && (
                  <Link className="link" to={`/post/${myPosts.id}`}>
                    <img src={`../upload/${myPosts.img}`} alt="" />
                  </Link>
                )}
              </div>
              <div className="content">
                {myPosts.title !== null && (
                  <Link className="link" to={`/post/${myPosts.id}`}>
                    <h1>{myPosts.title}</h1>
                  </Link>
                )}
                {myPosts.desc !== null && <p>{getText(myPosts.desc)}</p>}
                <Link className="link" to={`/Post/${myPosts.id}`}>
                <button className="read-button">Read More</button>
              </Link>
              </div>
            </div>
          ))
        ) : (
          <center>
            <p>No Post available</p>
          </center>
        )}
      </div>
    </div>
  ); 
};

export default Drafts;
