const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRouter");
const eventRoutes = require("./routes/eventRouter");
const runMigration = require("./config/migration");

dotenv.config();

const app = express();

runMigration();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/manage", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
