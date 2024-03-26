import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import bodyParser from 'body-parser';
import Post from './models/Post.js';
import uploadRouter from "./routes/uploadRoutes.js";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
// Middleware
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/upload", uploadRouter);
app.use("/api/seed", seedRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// Routes
app.post('/api/posts', async (req, res) => {
  try {
    const {
      name,
      slug,
      image,
      images,
      category,
      gender,
      genderpref,
      body,
      country,
      school,
      birth,
      about,
      whatsapp,
      phone,
      instagram,
      age,
      city,
      // Add more fields here if needed
    } = req.body;

    const post = new Post({
      name,
      slug,
      image,
      images,
      category,
      gender,
      genderpref,
      body,
      country,
      school,
      birth,
      about,
      whatsapp,
      phone,
      instagram,
      age,
      city,
      // Assign other fields here if needed
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
