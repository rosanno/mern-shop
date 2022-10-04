import express from "express";
import user from "../controllers/user.js";

const router = express.Router();

router.get("/", user);

export default router;
