const { Category } = require("../model/categoryModel");
const express = require("express");
const router = express.Router();

// Get list of Categories
router.get("/", async (req, res) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

// get specific category

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).json({ messege: "cannot find this categoryId " });
  }
  res.status(200).send(category);
});

// creat category
router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) {
    return res.status(404).send("the category cannot be created!");
  }
  res.status(200).send(category);
});

// update the category
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true },
  );
  if (!category) {
    return res.status(404).json({ message: "the category updated" });
  }
  res.send(category);
});

//delete one category
router.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "category id not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
});

module.exports = router;
