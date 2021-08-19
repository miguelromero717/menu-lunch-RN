const express = require("express");
const Meals = require("../models/Meals");

const router = express.Router();

router.get("/", (req, res) => {
  Meals.find()
    .exec()
    .then((m) => res.status(200).send(m));
});

router.get("/:id", (req, res) => {
  Meals.findById(req.params.id)
    .exec()
    .then((m) => res.status(200).send(m));
});

router.post("/", (req, res) => {
  Meals.create(req.body).then((m) => res.status(201).send(m));
});

router.put("/:id", (req, res) => {
  Meals.findOneAndUpdate(req.params.id, req.body).then(() =>
    res.sendStatus(204)
  );
});

router.delete("/:id", (req, res) => {
  Meals.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

module.exports = router;
