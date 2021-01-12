const express = require("express");
const articleRouter = express.Router();
const Article = require("../../models/Article");
const multer = require("multer");
const cloudinary = require("../../lib/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "listing",
    //   format: async (req, file) => 'png', // supports promises as well
    //   public_id: (req, file) => 'computed-filename-using-request',
  },
});

//GET /articles
// retireve a list of all articles
articleRouter.get("/", async (req, res, err) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.send(articles);
  } catch (err) {
    const error = new Error("No articles found");
    error.code = 404;
    next(error);
  }
});

//GET /articles/:id
// retireve a single article by ID
articleRouter.get("/:id", async (req, res, err) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    res.send(article);
  } catch (err) {
    const error = new Error("No article found");
    error.code = 404;
    next(error);
  }
});

//POST /articles
// create a new article,
articleRouter.post("/", async (req, res, err) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.send(newArticle, " created");
  } catch (err) {
    const error = new Error("No articles found with this ID");
    error.code = 404;
    next(error);
  }
});
//PUT /articles/:id
// edit a single article by ID
articleRouter.put("/:id", async (req, res, err) => {
  try {
    const articeToEdit = await Article.findByIdAndUpdate(id, req.body);
    res.send(articeToEdit._id, " edited");
  } catch (err) {
    const error = new Error("No articles found with this ID");
    error.code = 404;
    next(error);
  }
});
//DELETE /articles/:id
// delete a single article by ID
articleRouter.delete("/:id", async (req, res, err) => {
  try {
    const { id } = req.params;
    const articleDeleted = await Article.findByIdAndDelete(id);
    res.send("deleted");
  } catch (err) {
    const error = new Error("No articles found with this ID");
    error.code = 404;
    next(error);
  }
});

module.exports = articleRouter;
