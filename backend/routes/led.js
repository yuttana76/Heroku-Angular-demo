const express = require("express");

const router = express.Router();
const ledController = require('../controllers/led')

// router.get("", checkAuth, fundController.getFunds);
router.get("/GetBankruptList/:id", ledController.GetBankruptList);
router.post("/encoding", ledController.encodingBase64);
router.post("/decoding", ledController.decodingBase64);

router.post("/encryptURSA", ledController.encryptURSA);

module.exports = router;
