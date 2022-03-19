const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const contactRouter = require("./routes");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", contactRouter);

app.listen(PORT, () => console.log(`server launch (port ${PORT})`));
