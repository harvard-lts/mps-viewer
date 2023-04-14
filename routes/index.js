const express = require('express');
const router = express.Router();
const embedCtrl = require('../controllers/embed.ctrl');

const { body,validationResult } = require('express-validator');

/**
 *
 * 
<div class="col-md-12">
<div class="list-group">
  <a href="/example/W401849_URN-3:HUL.ARCH:2009749" class="list-group-item list-group-item-action">Harvard University Baseball Team, photograph, 1892</a>
  <a href="/example/W401827_URN-3:HUL.ARCH:2009747" class="list-group-item list-group-item-action">Harvard-Yale Baseball Game. Holmes Field, photograph, 1885</a>
  <a href="/example/W587091_URN-3:RAD.SCHL:11680642" class="list-group-item list-group-item-action">To roast a chicken; show #217</a>
  <a href="/example/HUAM140429_URN-3:HUAM:INV012574P_DYNMC" class="list-group-item list-group-item-action">Untitled Drumset</a>
  <a href="/example/990100671200203941" class="list-group-item list-group-item-action">Hot Dog In The Manger</a>
  <a href="/example/990095204340203941" class="list-group-item list-group-item-action">Chronique du monde depuis la création, et des rois de France et d'Angleterre, jusqu'à l'an 1461: manuscript, [ca. 1461]. MS Typ 41. Houghton Library, Harvard University, Cambridge, Mass.</a>
  <a href="/example/990098789400203941" class="list-group-item list-group-item-action">Heures de Nôtre Dame (use of Troyes and Sens) : manuscript, [ca. 1470]</a>
</div>
 */
router.get("/", function (req, res) {

  const examples = [
    {
      "href": "/example/W401849_URN-3:HUL.ARCH:2009749",
      "text": "Harvard University Baseball Team, photograph, 1892"
    },
    {
      "href": "/example/W401827_URN-3:HUL.ARCH:2009747",
      "text": "Harvard-Yale Baseball Game. Holmes Field, photograph, 1885"
    },
    {
      "href": "/example/W587091_URN-3:RAD.SCHL:11680642",
      "text": "To roast a chicken; show #217"
    },
    {
      "href": "/example/HUAM140429_URN-3:HUAM:INV012574P_DYNMC",
      "text": "Untitled Drumset"
    },
    {
      "href": "/example/990100671200203941",
      "text": "Hot Dog In The Manger"
    },
    {
      "href": "/example/990095204340203941",
      "text": "Chronique du monde depuis la création, et des rois de France et d'Angleterre, jusqu'à l'an 1461: manuscript, [ca. 1461]. MS Typ 41. Houghton Library, Harvard University, Cambridge, Mass."
    },
    {
      "href": "/example/990098789400203941",
      "text": "Heures de Nôtre Dame (use of Troyes and Sens) : manuscript, [ca. 1470]"
    }
  ];

  res.render("index", {
      title: "Welcome to the MPS Viewer!",
      examples: examples
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