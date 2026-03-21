import { Hotel } from "../models";

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
