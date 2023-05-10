const express = require('express');
const router = express.Router();
const embedCtrl = require('../controllers/embed.ctrl');
const consoleLogger = require('../logger/logger.js').console;
const exampleItems = require('../config/example-items.json');

router.get("/", async (req, res) => {

  const idsExamples = exampleItems.idsExamples;
  const mpsExamples = exampleItems.mpsExamples;

  res.render("index", {
    title: "Welcome to the MPS Viewer!",
    idsExamples: idsExamples,
    mpsExamples: mpsExamples
  });
});

router.get("/example/:manifestType/:uniqueIdentifier", async (req, res) => {
    let viewerURL = '';
    let title = '';
    let iiifManifest = '';
    let errorMsg = '';
    // Unique identifier will be a urn (mps) or record identifier (legacy)
    const uniqueIdentifier = req.params.uniqueIdentifier;
    // Manifest type will be either 'mps' or 'legacy'
    const manifestType = req.params.manifestType || 'mps';
    // Manifest version will be 2 or 3
    const manifestVersion = req.query.manifestVersion || '3';

    consoleLogger.debug("/example/:manifestType/:uniqueIdentifier");
    consoleLogger.debug(`uniqueIdentifier ${uniqueIdentifier} manifestType ${manifestType} manifestVersion ${manifestVersion}`);

    try {
      embed = await embedCtrl.getEmbed(uniqueIdentifier, manifestType, manifestVersion);
    } catch(e) {
      consoleLogger.error(e);
    }

    if (embed) {
      if (embed.hasOwnProperty('error')) {
        errorMsg = embed.error;
      }
      if (embed.data) {
        if (embed.data.hasOwnProperty('html')) {
          viewerURL = embed.data.html;
        }
        if (embed.data.hasOwnProperty('title')) { 
          title = embed.data.title;
        }
        if (embed.data.hasOwnProperty('iiif_manifest')) {
          iiifManifest = embed.data.iiif_manifest;
        }
      }
    }

    res.render("example", {
      title: title,
      viewerURL: viewerURL,
      iiifManifest: iiifManifest,
      error: errorMsg,
    });
});

router.get("/viewer", async (req, res) => {
  res.render("viewer", {
    title: "Mirador Viewer",
    manifestId: req.query.manifestId
  });
});

module.exports = router;
