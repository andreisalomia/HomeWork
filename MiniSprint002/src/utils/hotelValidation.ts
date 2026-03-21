import Joi from 'joi';

export const createHotelSchema = Joi.object({
  GlobalPropertyName:      Joi.string().max(100).required(),
  SourcePropertyID:        Joi.string().max(50).allow(null).optional(),
  GlobalChainCode:         Joi.string().max(10).allow(null).optional(),
  PropertyAddress1:        Joi.string().allow(null).optional(),
  PropertyAddress2:        Joi.string().allow(null).optional(),
  PrimaryAirportCode:      Joi.string().max(10).allow(null).optional(),
  CityID:                  Joi.number().integer().allow(null).optional(),
  PropertyStateProvinceID: Joi.number().integer().allow(null).optional(),
  PropertyZipPostal:       Joi.string().max(20).allow(null).optional(),
  PropertyPhoneNumber:     Joi.string().max(20).allow(null).optional(),
  PropertyFaxNumber:       Joi.string().max(20).allow(null).optional(),
  SabrePropertyRating:     Joi.number().min(0).max(5).precision(1).allow(null).optional(),
  PropertyLatitude:        Joi.number().precision(6).allow(null).optional(),
  PropertyLongitude:       Joi.number().precision(6).allow(null).optional(),
  SourceGroupCode:         Joi.string().max(10).allow(null).optional(),
});

export const updateHotelSchema = Joi.object({
  GlobalPropertyName:      Joi.string().max(100).optional(),
  SourcePropertyID:        Joi.string().max(50).allow(null).optional(),
  GlobalChainCode:         Joi.string().max(10).allow(null).optional(),
  PropertyAddress1:        Joi.string().allow(null).optional(),
  PropertyAddress2:        Joi.string().allow(null).optional(),
  PrimaryAirportCode:      Joi.string().max(10).allow(null).optional(),
  CityID:                  Joi.number().integer().allow(null).optional(),
  PropertyStateProvinceID: Joi.number().integer().allow(null).optional(),
  PropertyZipPostal:       Joi.string().max(20).allow(null).optional(),
  PropertyPhoneNumber:     Joi.string().max(20).allow(null).optional(),
  PropertyFaxNumber:       Joi.string().max(20).allow(null).optional(),
  SabrePropertyRating:     Joi.number().min(0).max(5).precision(1).allow(null).optional(),
  PropertyLatitude:        Joi.number().precision(6).allow(null).optional(),
  PropertyLongitude:       Joi.number().precision(6).allow(null).optional(),
  SourceGroupCode:         Joi.string().max(10).allow(null).optional(),
}).min(1);