import { Router } from "express";
import { getAllHotels, getHotelByName, createHotel, updateHotel, deleteHotel, } from "../controllers/hotelController";

const router = Router();

router.get("/", getAllHotels);
router.get("/:name", getHotelByName);

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
