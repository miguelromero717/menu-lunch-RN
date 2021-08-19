const express = require("express");
const Orders = require("../models/Orders");

const router = express.Router();

router.get("/", (req, res) => {
  Orders.find()
    .exec()
    .then((m) => res.status(200).send(m));
});

router.get("/:id", (req, res) => {
  Orders.findById(req.params.id)
    .exec()
    .then((m) => res.status(200).send(m));
});

router.post("/", (req, res) => {
  Orders.create(req.body).then((m) => res.status(201).send(m));
});

router.put("/:id", (req, res) => {
  Orders.findOneAndUpdate(req.params.id, req.body).then(() =>
    res.sendStatus(204)
  );
});

router.delete("/:id", (req, res) => {
  Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

module.exports = router;
