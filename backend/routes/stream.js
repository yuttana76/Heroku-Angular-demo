const express = require("express");

const router = express.Router();
const controllers = require('../controllers/stream')

// router.get("", checkAuth, fundController.getFunds);
router.get("/GetVDO1", controllers.GetVDO1);

module.exports = router;
