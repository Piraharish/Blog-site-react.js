import { db } from "../db.js";
import jwt from "jsonwebtoken";


export const addDraft = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const q =
        "INSERT INTO drafts(`title`, `des`,`content`, `img`, `cat`, `date`,`user_id`) VALUES (?)";
  
      const values = [
        req.body.title, req.body.desc, req.body.content, req.body.img, req.body.cat, req.body.date, userInfo.id,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("An error occurred while creating the draft.");
        return res.json("draft has been saved.");
      });
    });
  };

  export const getDrafts = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

    const user_id = userInfo.id;  
    const q = "SELECT * FROM drafts WHERE user_id = ?";
  
    db.query(q, [user_id], (err, data) => {
      if (err) return res.status(500).json("Error while Retrieving",err);
      return res.status(200).json({ data, message: "draft has been retrieved" });
    });
  });
  };

  export const deleteDraft = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      console.log("Req Params",req.params);
      const draftId = req.params.id;
      const q = "DELETE FROM drafts WHERE `id` = ? AND `user_id` = ?";
      db.query(q, [draftId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");
  
        return res.json("Post has been deleted!");
      });
    });
  };

  export const updateDraft = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;

      const q = "UPDATE drafts SET `title`=?, `des`=?, `content`=?, `img`=?, `cat`=? WHERE `id` = ? AND `user_id` = ?";
  
      const values = [
        req.body.title, req.body.desc, req.body.content, req.body.img, req.body.cat, postId, userInfo.id,
      ];
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("draft has been updated.");
      });
    });
  };
  