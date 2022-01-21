const express = require('express');
const router = express.Router();
const qs = require('query-string');
const eta = require('eta');
const path = require('path');
const embedCtrl = require('../controllers/embed.ctrl');


const { body,validationResult } = require('express-validator');

router.get("/", function (req, res) {
  res.render("index", {
      title: "Welcome to the MPS Viewer!",
  });
});

router.get("/example/:recordIdentifier", async function (req, res) {
    let viewerURL = '';
    let title = '';
    let iiifManifest = '';
    let errorMsg = '';

    embed = await embedCtrl.getEmbed(req.params.recordIdentifier);

    if (embed.hasOwnProperty('error')) {
        errorMsg = embed.error;
    }
    if (embed.data.hasOwnProperty('html')) {
        viewerURL = embed.data.html;
    }
    if (embed.data.hasOwnProperty('title')) { 
        title = embed.data.title;
    }
    if (embed.data.hasOwnProperty('iiif_manifest')) {
        iiifManifest = embed.data.iiif_manifest;
    }

    res.render("example", {
        title: title,
        viewerURL: viewerURL,
        iiifManifest: iiifManifest,
        error: errorMsg,
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