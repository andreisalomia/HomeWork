const sequelize = require('../config/database');
const Hotel = require('./Hotel');
const City = require('./City');
const Region = require('./Region');

City.hasMany(Hotel, { foreignKey: 'CityID' });
Hotel.belongsTo(City, { foreignKey: 'CityID' });

Region.hasMany(Hotel, { foreignKey: 'PropertyStateProvinceID' });
Hotel.belongsTo(Region, { foreignKey: 'PropertyStateProvinceID' });

module.exports = { sequelize, Hotel, City, Region };