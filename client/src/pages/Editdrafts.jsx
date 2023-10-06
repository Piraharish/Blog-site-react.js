import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const EditDraft = () => {
  const { id } = useParams();
  const state = useLocation().state;
  console.log("State:",state);
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(state?.img || null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      // If state is not defined, it means we are creating a new draft.
      // You can perform any necessary initializations here.
    }
  }, [state]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Read and display the selected image as a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewImage(null);
  };

  const updateDraft = async () => {
    const imgUrl = await upload();
    try {
      await axios.put(`/drafts/${id}`, {
        title,
        desc: value,
        content,
        cat,
        img: file ? imgUrl : state.img,
      });
      navigate("/drafts");
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  const publishDraft = async () => {
    const imgUrl = await upload();
    try {
      await axios.post(`/posts/`, {
        title,
        desc: value,
        content,
        cat,
        img: file ? imgUrl : state.img,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      navigate("/");
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <p><strong>Title</strong></p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p><strong>Description</strong></p>
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <p><strong>Content</strong></p>
        <div className="contentContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Update Draft</h1>
          <div className="buttons">
            <button onClick={updateDraft}>Update</button>
          </div>
        </div>

        <div className="item">
          <h1>Upload Image</h1>
          <div className="upload-container">
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={handleFileChange}
            />
            <div className="image-preview">
              <div className="preview-border">
                {previewImage ? (
                  <img src={previewImage} alt="" />
                ) : (
                  <div className="dotted-border">Preview</div>
                )}
              </div>
              <div className="buttons-container">
                {!previewImage && (
                  <label className="upload-button" htmlFor="file">
                    Upload Image
                  </label>
                )}
                {previewImage && (
                  <div className="remove-button" onClick={handleRemoveImage}>
                    Remove
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
        <div className="item">
          <h1>Publish Draft</h1>
          <div className="buttons">
            <button onClick={publishDraft}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDraft;
