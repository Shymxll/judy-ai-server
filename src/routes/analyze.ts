import express, { RequestHandler, Router } from "express";
import { analyze } from "../controllers/analyzeController";



const router: Router = express.Router();

router.get("/", analyze as RequestHandler);

export default router;