import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import draftRoutes from "./routes/drafts.js"
import myPostRoutes from "./routes/myPosts.js"
import cookieParser from "cookie-parser";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

    // Profile Image

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, "../client/public/profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
    
const profileUpload = multer({ storage: profileStorage, limits: { fileSize: 10 * 1024 * 1024 } });
    
app.post("/api/upload-profile", profileUpload.single("file"), function (req, res) {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }
  res.status(200).json(file.filename);
});

  // Deleting Previous Profile

app.delete("/api/delete-profile-image/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = `../client/public/profile/${filename}`;
  const fs = require("fs");
  
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ error: "Error deleting image" });
    }
    console.log("Image deleted successfully");
    return res.status(200).json({ message: "Image deleted successfully" });
  });
});     

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/drafts", draftRoutes);
app.use("/api/myPosts", myPostRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});
