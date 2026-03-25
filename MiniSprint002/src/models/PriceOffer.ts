import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class PriceOffer extends Model<InferAttributes<PriceOffer>, InferCreationAttributes<PriceOffer>> {
  declare OfferID: CreationOptional<number>;
  declare HotelID: number;
  declare Cheap: boolean;
  declare Budget: boolean;
  declare Standard: boolean;
  declare Premium: boolean;
  declare Luxury: boolean;
}

PriceOffer.init(
  {
    OfferID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    HotelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Hotels', key: 'GlobalPropertyID' },
    },
    Cheap: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Budget: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Standard: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Premium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Luxury: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'PriceOffers',
    timestamps: false,
  }
);

export default PriceOffer;