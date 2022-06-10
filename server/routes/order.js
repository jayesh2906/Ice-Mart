import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import { addOrder, getOrders } from "../controllers/order.js";

router.post("/", auth, addOrder);
router.get("/", auth, getOrders);

export default router;
