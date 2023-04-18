const express = require('express');
const router = express.Router();
const embedCtrl = require('../controllers/embed.ctrl');
const consoleLogger = require('../logger/logger.js').console;

const { body,validationResult } = require('express-validator');

router.get("/", async (req, res) => {

  const idsExamples = [
    {
      "href": "/example/legacy/W401849_URN-3:HUL.ARCH:2009749",
      "text": "Harvard University Baseball Team, photograph, 1892"
    },
    {
      "href": "/example/legacy/W401827_URN-3:HUL.ARCH:2009747",
      "text": "Harvard-Yale Baseball Game. Holmes Field, photograph, 1885"
    },
    {
      "href": "/example/legacy/W587091_URN-3:RAD.SCHL:11680642",
      "text": "To roast a chicken; show #217"
    },
    {
      "href": "/example/legacy/HUAM140429_URN-3:HUAM:INV012574P_DYNMC",
      "text": "Untitled Drumset"
    },
    {
      "href": "/example/legacy/990100671200203941",
      "text": "Hot Dog In The Manger"
    },
    {
      "href": "/example/legacy/990095204340203941",
      "text": "Chronique du monde depuis la création, et des rois de France et d'Angleterre, jusqu'à l'an 1461: manuscript, [ca. 1461]. MS Typ 41. Houghton Library, Harvard University, Cambridge, Mass."
    },
    {
      "href": "/example/legacy/990098789400203941",
      "text": "Heures de Nôtre Dame (use of Troyes and Sens) : manuscript, [ca. 1470]"
    }
  ];

  const mpsExamples = [
    {
      "href": "/example/mps/URN-3:FHCL:100001249?manifestVersion=2",
      "text": "Tibetan Buddhist Resource Center",
      "version": 2
    },
    {
      "href": "/example/mps/URN-3:FHCL:100001249?manifestVersion=2",
      "text": "Tibetan Buddhist Resource Center",
      "version": 3
    },
    {
      "href": "/example/mps/URN-3:FHCL:42632611?manifestVersion=2",
      "text": "Harvard Yenching Fushun Xian zhi 37 juan",
      "version": 2
    },
    {
      "href": "/example/mps/URN-3:FHCL:42632611?manifestVersion=3",
      "text": "Harvard Yenching Fushun Xian zhi 37 juan",
      "version": 3
    },
    {
      "href": "/example/mps/URN-3:FHCL:100252142?manifestVersion=2",
      "text": "Harvard-Yale Baseball Game. Holmes Field, photograph, 1885",
      "version": 2
    },
    {
      "href": "/example/mps/URN-3:FHCL:100252142?manifestVersion=3",
      "text": "Harvard-Yale Baseball Game. Holmes Field, photograph, 1885",
      "version": 3
    },
  ];

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
