
import sequelize from "./config/db.js";

try {
  await sequelize.authenticate();
  console.log("Connected to MySQL successfully!");
} catch (error) {
  console.error("Database connection failed:", error.message);
} finally {
  await sequelize.close();
}
