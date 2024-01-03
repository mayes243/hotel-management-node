require("dotenv").config();
const { connect, disconnect } = require("mongoose");
const SiteSetting = require("./../models/SiteSetting");

// Configure Mongoose to Connect to Database
const db_connection = process.env.DB_CONNECTION;
connect(db_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((response) => {
    console.log("Database connected for seed data!");
  })
  .catch((error) => {
    console.log("Databse connection failed!");
  });

const setting = new SiteSetting({
  title: "Online Cafe",
  contactPerson: "Pawan Group",
  email: "dummy@somedomain.com",
});

setting.save(function () {
  exit();
});

function exit() {
  disconnect();
  console.log("Seed Data Successfully Injected!!!");
}
