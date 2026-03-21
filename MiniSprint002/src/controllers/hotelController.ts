import { Request, Response } from 'express';
import * as hotelService from '../services/hotelService';
import { createHotelSchema, updateHotelSchema } from '../utils/hotelValidation';

export const getAllHotels = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotels = await hotelService.findAllHotels();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve hotels' });
  }
};

export const getHotelByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotel = await hotelService.findHotelByName(req.params.name as string);
    if (!hotel) {
      res.status(404).json({ error: 'Hotel not found' });
      return;
    }
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve hotel' });
  }
};

export const createHotel = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = createHotelSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0]?.message });
    return;
  }

  try {
    const hotel = await hotelService.createHotel(value);
    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create hotel' });
  }
};

export const updateHotel = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = updateHotelSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0]?.message });
    return;
  }

  try {
    const hotel = await hotelService.updateHotel(Number(req.params.id), value);
    if (!hotel) {
      res.status(404).json({ error: 'Hotel not found' });
      return;
    }
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hotel' });
  }
};

export const deleteHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await hotelService.deleteHotel(Number(req.params.id));
    if (!result) {
      res.status(404).json({ error: 'Hotel not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hotel' });
  }
};