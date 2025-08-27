require("dotenv").config({ path: __dirname + "/../.env.local" }); // Ensure it's loading the .env.local from /server

const mysql = require("mysql2/promise");

// DEBUG: Log loaded env vars
console.log("Loaded DB_HOST:", process.env.DB_HOST);
console.log("Loaded DB_USER:", process.env.DB_USER);
console.log("Loaded DB_NAME:", process.env.DB_NAME);
// ❗ Avoid logging the password in case you're sharing this

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("Connecting to:", process.env.DB_HOST);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ DB connected");
    connection.release();
  } catch (err) {
    console.error("❌ DB connect error:", err);
  }
})();

module.exports = pool;
