
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mustChangePassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    allowNull: false
  }
}, {
  tableName: "Users",
  timestamps: false
});

export default User;
