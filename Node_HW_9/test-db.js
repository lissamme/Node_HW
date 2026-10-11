
import sequelize from "./config/db.js";

try {
  await sequelize.authenticate();
  console.log("MySQL connected successfully!");
} catch (error) {
  console.error("Connection failed:", error.message);
} finally {
  await sequelize.close();
}
