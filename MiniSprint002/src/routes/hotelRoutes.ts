import { Router } from "express";
import { getAllHotels, getHotelByName, createHotel, updateHotel, deleteHotel, getBestOffersNearAirport } from "../controllers/hotelController";
import { basicAuth } from "../middleware/auth";

const router = Router();

router.get("/", getAllHotels);
router.get("/nearest-airport/:iataCode/best-offers", getBestOffersNearAirport);
router.get("/:name", getHotelByName);

router.post("/", basicAuth, createHotel);
router.put("/:id", basicAuth, updateHotel);
router.delete("/:id", basicAuth, deleteHotel);

export default router;
