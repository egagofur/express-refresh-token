import express from "express";
import { config } from "./utils/config";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
