// test-db.js
console.log("▶ Starting DB test...");

const db = require("./db");

db.query("SELECT 1 + 1 AS result", (err, results) => {
  if (err) {
    console.error("❌ Query failed:", err);
  } else {
    console.log("✅ Query result:", results[0].result);
  }
  db.end(); // Always close the DB connection
});
