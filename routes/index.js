const express = require('express');
const router = express.Router();
const qs = require('query-string');
const eta = require('eta');

const path = require('path');

const { body,validationResult } = require('express-validator');

const getUserFromReq = (req) => {
    return req.token && req.token.user || null;
}

router.get("/", function (req, res) {
  res.render("index", {
      title: "Docker NodeJS Template!",
      body: "Hello, World!",
  });
});

router.get("/example/:objectType/:objectId", function (req, res) {
    res.render("example", {
        title: "Docker NodeJS Template!",
        body: "Hello, World!",
        objectType: req.params.objectType,
        objectId: req.params.objectId,
    });
});

router.get("/viewer/:objectType/:objectId", function (req, res) {
  res.render("viewer", {
      title: "Mirador Viewer",
      objectType: req.params.objectType,
      objectId: req.params.objectId,
  });
});

module.exports = router;