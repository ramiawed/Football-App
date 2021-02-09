import pkg from "mongoose";
const { connect } = pkg;

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import { config } from "dotenv";
import app from "./app.js";

config({ path: "../config.env" });

// DATABASE CONFIGURATION OPTION {USERNAME, PASSWORD, DBNAME}
const DB_USER = process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB_NAME = process.env.DATABASE_NAME;

// BUILD THE CONNECTION STRING
let DB = process.env.DATABASE.replace("<user>", DB_USER);
DB = DB.replace("<password>", DB_PASSWORD);
DB = DB.replace("<dbname>", DB_NAME);

// CONNECT TO MONGO DB
connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`DB connection successful`);
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server running on port 8000`);
});

// all promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!, Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
