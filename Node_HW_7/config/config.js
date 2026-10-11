
export default {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
