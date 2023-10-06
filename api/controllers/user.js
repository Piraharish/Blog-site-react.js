import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getProfile = (req, res) =>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

    const id = userInfo.id;

    const q = "SELECT u.id, u.username, u.email, u.img, u.mobile, u.followers, u.following, COUNT(DISTINCT p.id) AS postCount, COUNT(DISTINCT d.id) AS draftCount FROM users u LEFT JOIN posts p ON u.id = p.uid LEFT JOIN drafts d ON u.id = d.user_id WHERE u.id = ? GROUP BY u.id, u.username, u.email, u.img, u.mobile, u.followers, u.following;";
    
    db.query(q, [id], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }else{
        return res.status(200).json(data[0]);
        }
      });
  });    
}

export const getUser = (req, res) =>{
  const { username } = req.params

  const q = "SELECT u.id, u.username, u.img, u.followers, u.following, COUNT(p.id) AS postCount FROM users u LEFT JOIN posts p ON u.id = p.uid WHERE u.username = ? GROUP BY u.id;";
  
  db.query(q, [username], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });   
}

export const updateProfile = (req, res) => {

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { username, email, img, mobile } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: "Username and email are required fields" });
    }

    const q = "SELECT * FROM users WHERE (email = ? OR username = ?) AND id != ?";
    db.query(q, [email, username, userInfo.id], (err, data) => {
      if (err) return res.status(500).json({ error: "Database error: " + err.message });
      if (data.length > 0) {
        return res.status(409).json("Username or email already exists.");
      }
      const parsedMobile = mobile ? parseInt(mobile, 10) : null;
      const updateQuery = "UPDATE users SET username=?, email=?, img=?, mobile=? WHERE id=?";
      const updateValues = [username, email, img, parsedMobile, userInfo.id];

      db.query(updateQuery, updateValues, (err, updateResult) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        return res.json("Profile has been updated.");
      });
    });
  });
};



