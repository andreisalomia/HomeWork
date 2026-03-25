import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
  declare ReviewID: CreationOptional<number>;
  declare HotelID: number;
  declare AuthorName: string;
  declare Text: string | null;
  declare RatingCleanliness: number | null;
  declare RatingLocation: number | null;
  declare RatingStaff: number | null;
  declare RatingComfort: number | null;
  declare RatingFacilities: number | null;
  declare RatingVFM: number | null;
  declare RatingOverall: number | null;
  declare ReviewDate: Date | null;
}

Review.init(
  {
    ReviewID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    HotelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Hotels', key: 'GlobalPropertyID' },
    },
    AuthorName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    RatingCleanliness: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    RatingLocation: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    RatingStaff: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    RatingComfort: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    RatingFacilities: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    RatingVFM: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    RatingOverall: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    ReviewDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Reviews',
    timestamps: false,
  }
);

export default Review;