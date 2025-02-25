import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

import { v1Router } from "@/routes/v1";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.json({
    message: "Silence is golden",
  });
});

app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
