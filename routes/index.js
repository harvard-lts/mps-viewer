const express = require('express');
const router = express.Router();
const embedCtrl = require('../controllers/embed.ctrl');
const examplesCtrl = require('../controllers/examples.ctrl');
const manifestsCtrl = require('../controllers/manifests.ctrl');
const consoleLogger = require('../logger/logger.js').console;

router.get("/", async (req, res) => {

  let exampleItems;
  try {
    exampleItems = await examplesCtrl.getExamples();
  } catch(e) {
    consoleLogger.error(e);
  }

  const idsExamples = exampleItems.idsExamples;
  const mpsExamples = exampleItems.mpsExamples;

  res.render("index", {
    title: "",
    idsExamples: idsExamples,
    mpsExamples: mpsExamples
  });
});

router.get("/example/manifest/", async (req, res) => {
  let viewerURL = '';
  let title = '';
  let iiifManifest = '';
  let errorMsg = '';
  
  const uniqueIdentifier = req.query.manifestId;
  const manifestType = 'manifest';
  const manifestVersion = '3';
  // Height and Width of Viewer
  const height = '';
  const width = '100%';
  try {
    embed = await embedCtrl.getEmbed(uniqueIdentifier, manifestType, manifestVersion, height, width);
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
    // Used to override to use Production MPS to get the Manifest
    const productionOverride = req.query.prod || '';    
    // Height and Width of Viewer
    const height = '';
    const width = '100%';

    consoleLogger.debug("/example/:manifestType/:uniqueIdentifier");
    consoleLogger.debug(`uniqueIdentifier ${uniqueIdentifier} manifestType ${manifestType} manifestVersion ${manifestVersion} height ${height} width ${width} productionOverride ${productionOverride}`);

    try {
      embed = await embedCtrl.getEmbed(uniqueIdentifier, manifestType, manifestVersion, height, width, productionOverride);
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

  let title = '';
  
  try {
    manifestResponse = await manifestsCtrl.getManifest(req.query.manifestId);
    manifestData = manifestResponse.data || {};
    consoleLogger.debug(manifestData);

    title = manifestData.id || ''; 
    if (manifestData.hasOwnProperty('label')) {
      if (manifestData.label.hasOwnProperty('none')) {
        title = manifestData.label.none[0] || '';
      } 
      else {
        title = manifestData.label || '';
      }
    }
    consoleLogger.debug('title: '+title);

  } catch(e) {
    consoleLogger.error(e);
    result.error = e;
    return res.status(500).json(result);
  }

  res.render("viewer", {
    title: title,
    manifestId: req.query.manifestId
  });
});

module.exports = router;
