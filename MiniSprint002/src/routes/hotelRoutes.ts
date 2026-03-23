import { Router } from "express";
import { getAllHotels, getHotelByName, createHotel, updateHotel, deleteHotel, } from "../controllers/hotelController";
import { basicAuth } from "../middleware/auth";

const router = Router();

router.get("/", getAllHotels);
router.get("/:name", getHotelByName);

router.post("/", basicAuth, createHotel);
router.put("/:id", basicAuth, updateHotel);
router.delete("/:id", basicAuth, deleteHotel);

export default router;
