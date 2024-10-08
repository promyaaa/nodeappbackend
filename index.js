const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 4000; // default port 4000

const news = require("./data/news.json");
const categories = require("./data/categories.json");

app.use(cors());

app.get("/", (req, res) => {
  res.send("node server running");
});

app.get("/about", (req, res) => {
  res.send("About Us Page");
});

app.get("/news", (req, res) => {
  res.send(news);
});

app.get("/news/:id", (req, res) => {
  id = req.params.id;
  const selectedNews = news.find((n) => (n._id = id));
  res.send(selectedNews);
});

app.get("/category/:id", (req, res) => {
  id = req.params.id;
  console.log(id);
  const selectedNews = news.filter((n) => n.category_id == id);
  res.send(selectedNews);
});

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.listen(port, () => {
  console.log(`Server is running... on http://localhost:${port}`);
});
