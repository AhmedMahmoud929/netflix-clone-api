const router = require("express").Router();
const List = require("../models/List.model");
const verifyToken = require("../middlewares/verifyToken");

// Create a new list
router.post("/", verifyToken, async (req, res) => {
  // check it is an admin
  if (req.tokenData.isAdmin) {
    try {
      // check if title is used
      const titleUsed = await List.findOne({ title: req.body.title });
      if (titleUsed)
        res.status(500).json({ error: "This title is already used" });
      else {
        const newList = await new List(req.body).save();
        // send the response
        res.status(200).json({ message: "User added successfully", newList });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

// Get all movies
router.get("/", verifyToken, async (req, res) => {
  // check the admin identity
  if (req.tokenData.isAdmin) {
    try {
      // filter movies
      const filter = Object.values(req.query).length;
      const lists = await List.find(filter ? req.query : {});
      res.status(200).json({ lists });
    } catch (error) {
      res.status(404).json({ error });
    }
  } else res.status(401).json({ error: "You are not authorized" });
});

// Delete an exist list
router.delete("/:id", verifyToken, async (req, res) => {
  // check it is an admin
  if (req.tokenData.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);

      res.status(202).json({ message: "List deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(401).json({ error: "You are not authorized" });
});
module.exports = router;
