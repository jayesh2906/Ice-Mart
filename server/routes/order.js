import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import { addOrder, getOrders, getUserOrders } from "../controllers/order.js";

router.post("/", auth, addOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getUserOrders);

export default router;
