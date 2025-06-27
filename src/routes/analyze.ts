import express, { RequestHandler, Router } from "express";
import { analyze, process } from "../controllers/analyzeController";



const router: Router = express.Router();

router.get("/", analyze as RequestHandler);
router.get("/process", process as RequestHandler);

export default router;