import { Router } from "express";
import { uploadFile } from "../controllers/fileController.js";









const router = Router()


router.post('/upload', uploadFile)



export default router