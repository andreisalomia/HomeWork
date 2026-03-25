import Hotel from './Hotel';
import City from './City';
import Region from './Region';
import HotelGroup from './HotelGroup';
import Airport from './Airport';
import PriceOffer from './PriceOffer';
import Review from './Review';
import sequelize from '../config/database';

City.hasMany(Hotel, { foreignKey: 'CityID' });
Hotel.belongsTo(City, { foreignKey: 'CityID' });

Region.hasMany(Hotel, { foreignKey: 'PropertyStateProvinceID' });
Hotel.belongsTo(Region, { foreignKey: 'PropertyStateProvinceID' });

HotelGroup.hasMany(Hotel, { foreignKey: 'GroupID' });
Hotel.belongsTo(HotelGroup, { foreignKey: 'GroupID' });
 
City.hasMany(Airport, { foreignKey: 'CityID' });
Airport.belongsTo(City, { foreignKey: 'CityID' });
 
Hotel.hasOne(PriceOffer, { foreignKey: 'HotelID' });
PriceOffer.belongsTo(Hotel, { foreignKey: 'HotelID' });
 
Hotel.hasMany(Review, { foreignKey: 'HotelID' });
Review.belongsTo(Hotel, { foreignKey: 'HotelID' });

export { sequelize, Hotel, City, Region, HotelGroup, Airport, PriceOffer, Review };