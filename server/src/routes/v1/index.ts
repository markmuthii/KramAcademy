import { authRouter } from "@/routes/v1/auth";
import { Router } from "express";

const v1Router = Router();

v1Router.get("/", (req, res) => {
  res.json({
    message: "Silence is golden",
  });
});

v1Router.use("/auth", authRouter);

export { v1Router };
