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

// Catch all route. If a request reaches this point, it means the requested route does not exist.
app.all("*", async () => {
  throw new NotFoundError();
});

// Error handler
// Catches all errors thrown anywhere in the application, and sends a response to the client.
// This middleware along with the express-async-errors rids us of the need to use try-catch blocks in our application.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});
