const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mount the routes on /api path
app.use("/api", testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
