import Hotel from './Hotel';
import City from './City';
import Region from './Region';
import sequelize from '../config/database';

City.hasMany(Hotel, { foreignKey: 'CityID' });
Hotel.belongsTo(City, { foreignKey: 'CityID' });

Region.hasMany(Hotel, { foreignKey: 'PropertyStateProvinceID' });
Hotel.belongsTo(Region, { foreignKey: 'PropertyStateProvinceID' });

export { sequelize, Hotel, City, Region };