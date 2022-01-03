const express = require('express');
const router = express.Router();
const qs = require('query-string');
const eta = require('eta');
const path = require('path');
const embedCtrl = require('../controllers/embed.ctrl');


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

router.get("/example/:recordIdentifier", async function (req, res) {
    embed = await embedCtrl.getEmbed(req.params.recordIdentifier);

    viewerURL = embed.data.html;
    title = embed.data.title;
    iiifManifest = embed.data.iiif_manifest;

    res.render("example", {
        title: title,
        viewerURL: viewerURL,
        iiifManifest: iiifManifest,
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