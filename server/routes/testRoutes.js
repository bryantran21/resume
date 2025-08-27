const express = require("express");
const router = express.Router();
const testService = require("../services/testService");

router.get("/test-db", async (req, res) => {
  try {
    const result = await testService.pingDB();
    res.json({ success: true, message: "DB responded", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "DB error" });
  }
});

module.exports = router;
