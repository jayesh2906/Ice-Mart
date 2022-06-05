import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import {
  addProduct,
  deleteProduct,
  searchProducts,
  filterProducts,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

router.post("/", auth, addProduct);
router.get("/", getProducts);
router.get("/:name", searchProducts);
router.get("/filter/:category", filterProducts);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
