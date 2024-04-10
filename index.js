const express = require("express");
const colors = require("colors");
const morgan = require("morgan"); 
const dotenv = require("dotenv");
const guestRoutes = require('./routes/guestRoute');
const connectDb = require("./config/connectDb");
const path = require("path");

dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/guest", guestRoutes);

// Static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.green);
});
