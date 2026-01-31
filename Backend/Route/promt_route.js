import express from "express";
import { Sendpromt } from "../control/promt_control.js";
import userMiddleware from "../control/middleware.js";

const router = express.Router();

router.post("/promt",userMiddleware,Sendpromt);

export default router;