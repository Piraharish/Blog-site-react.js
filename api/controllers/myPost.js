import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getMyPosts = (req, res) => {
    // console.log("Called");
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
    const user_id = userInfo.id;  
    // console.log("user_id:",user_id);
    const q = "SELECT * FROM posts WHERE uid = ?";
    // console.log("Query:",q);
    db.query(q, [user_id], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Error while Retrieving", error: err });
      }
      // console.log("Post data:", data);
      return res.status(200).json({ data, message: "post has been retrieved" });
    });
    // console.log("Retrieved:");
  });
  };