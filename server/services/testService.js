// server/services/testService.js
const db = require("../db/db");

async function pingDB() {
  const [rows] = await db.query("SELECT 1 + 1 AS result");
  return rows[0];
}

module.exports = { pingDB };
