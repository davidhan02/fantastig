const express = require("express");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/characters", require("./routes/characters"));

app.get("/", (req, res) => res.send("API is running."));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
