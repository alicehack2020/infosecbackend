import express from "express";
const router = express.Router();
import { addRecord, updateRecord, deleteRecord,getAllData,getOne} from "../controllers/postController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
router.post("/add",checkUserAuth,addRecord)
router.put("/update",checkUserAuth,updateRecord)
router.delete("/delete",checkUserAuth,deleteRecord)
router.get("/list",checkUserAuth,getAllData)
router.get("/getOne",checkUserAuth,getOne)
export default router;
