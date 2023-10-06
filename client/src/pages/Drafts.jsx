import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../img/image.jpg";

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/drafts`,);
        setDrafts(res.data.data);
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

  const handleDelete = async (draftId)=>{
    try {
      await axios.delete(`/drafts/${draftId}`);
      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== draftId));
      // navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="home">
      <div className="posts">
        {Array.isArray(drafts) && drafts.length > 0 ? (
          drafts.map((draft) => (
            <div className="post" key={draft.id}>
              <div className="img">
                {draft.img ? (
                    <img src={`../upload/${draft.img}`} alt="" />
                  ) : (
                    <img src={Image} alt="" />
                )}
              </div>
              <div className="content">
                {draft.title !== null && (
                    <h1>{draft.title}</h1>
                )}
                
                {draft.des !== null && <p>{getText(draft.des)}</p>}
                {/* {draft.desc && (<p>{getText(draft.desc)}</p>)} */}
                <div className="button-container">
                  <button className="edit-button" onClick={() =>
                    navigate(`/edit-draft/${draft.id}`, {
                      state: { title: draft.title, desc: draft.des,
                    content: draft.content, img: draft.img, cat: draft.cat,},
                    })
                    }>
                    Edit Draft
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(draft.id)}>Delete Draft</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <center>
            <p>No drafts available</p>
          </center>
        )}
      </div>
    </div>
  ); 
};

export default Drafts;
