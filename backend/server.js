const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");
const cors = require('cors');

require("dotenv").config();

const app = express();
connectDB();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use(errorHandler);

// const app = require("./src/app");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;