import express, { Response } from "express";

const router = express.Router();

router.get("/hello", (_, response: Response) => {
  response.json({
    type: "success",
    message: "Hello, Cognum!",
  });
});

export default router;
