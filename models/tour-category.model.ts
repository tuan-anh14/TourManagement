import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const TourCategory = sequelize.define(
  "TourCategory",
  {
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "tours", //Tên bảng khoá ngoại mà tham chiếu đến
        key: "id", //Tên trường trong bảng khoá ngoại tham chiếu đến
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    tableName: "tours_categories",
    timestamps: false,
  }
);

export default TourCategory;
