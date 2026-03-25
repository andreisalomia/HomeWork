import { Hotel, PriceOffer, Airport } from "../models";
import { isPointWithinRadius, getDistance } from "geolib";

const DEFAULT_RADIUS_KM = 50;

export const findAllHotels = async () => {
    return Hotel.findAll();
};

export const findHotelByName = async (name: string) => {
    return Hotel.findOne({ where: { GlobalPropertyName: name } });
};

export const createHotel = async (data: Partial<Hotel>) => {
    return Hotel.create(data as Hotel);
};

export const updateHotel = async (id: number, data: Partial<Hotel>) => {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) return null;
    return hotel.update(data);
};

export const deleteHotel = async (id: number) => {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) return null;
    await hotel.destroy();
    return true;
};

export const findBestOffersNearAirport = async (
    iataCode: string,
    radiusKm: number = DEFAULT_RADIUS_KM,
    category?: string
): Promise<object[] | null> => {
    const airport = await Airport.findOne({ where: { IATACode: iataCode } });
    if (!airport || !airport.Latitude || !airport.Longitude) return null;
 
    const airportCoords = { latitude: Number(airport.Latitude), longitude: Number(airport.Longitude) };
 
    const hotels = await Hotel.findAll({ include: [{ model: PriceOffer}] });
 
    const hotelsWithCoords = hotels.filter((hotel) => hotel.PropertyLatitude && hotel.PropertyLongitude);
 
    const hotelsInRadius = hotelsWithCoords.filter((hotel) => {
        const hotelCoords = { latitude: Number(hotel.PropertyLatitude), longitude: Number(hotel.PropertyLongitude) };
        return isPointWithinRadius(hotelCoords, airportCoords, radiusKm * 1000);
    });
 
    const hotelsWithCategory = category ? hotelsInRadius.filter((hotel) => (hotel as any).PriceOffer?.[category] === true) : hotelsInRadius;
 
    return hotelsWithCategory.map((hotel) => {
        const hotelCoords = { latitude: Number(hotel.PropertyLatitude), longitude: Number(hotel.PropertyLongitude) };
        return {
            ...hotel.toJSON(),
            distanceKm: Math.round(getDistance(hotelCoords, airportCoords) / 1000),
        };
    });
};
