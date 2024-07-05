import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addCupon,
  updateCuponDetails,
  removeCupon,
  fetchCupons,
  fetchCuponById,
  fetchAllCupons,
  filterCupons,
} from "../controllers/cuponController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(fetchCupons)
  .post(authenticate, authorizeAdmin, formidable(), addCupon);

router.route("/allcupons").get(fetchAllCupons);

router
  .route("/:id")
  .get(fetchCuponById)
  .put(authenticate, authorizeAdmin, formidable(), updateCuponDetails)
  .delete(authenticate, authorizeAdmin, removeCupon);

router.route("/filtered-cupons").post(filterCupons);

export default router;
