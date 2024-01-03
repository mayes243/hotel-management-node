//navie bayaes algorithm//
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { config, engine } = require("express-edge");
const flash = require("express-flash");
const session = require("express-session");
const methodOverrride = require("method-override");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const SiteSetting = require("./models/SiteSetting");
const Admin = require("./models/Admin");
// Local Imports
const globalVariables = require("./utils/globalVariables");

const frontendRoutes = require("./routes/frontendRoutes");
const userRoutes = require("./routes/userRoutes");
const backendRoutes = require("./routes/backendRoutes");

// Init App
const app = express();

// Configure Mongoose to Connect to Database
const db_connection = process.env.DB_CONNECTION;
mongoose
  .connect(db_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((response) => {
    console.log("Database connection established!");
  })
  .catch((error) => {
    console.log("Databse connection failed!");
  });

const setting = new SiteSetting({
  title: "Online Cafe",
  contactPerson: "Pawan Group",
  email: "dummy@somedomain.com",
});

setting.save((err) => {
  console.log(err);
});
const admin = new Admin({
  name: "Online Cafe",
  address: "New Baneshwor, Kathmandu",
  email: "admin@admin.com",
  password: "password123",
});
admin.save((err) => {
  console.log(err);
});

// Configure Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setting Static Path
app.use(express.static(`${__dirname}/public`));

// Flash and Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

// Use Global Variables
app.use(globalVariables);

// Init Passport
app.use(passport.initialize());
app.use(passport.session());

// Setup View engine to Use edge
app.use(engine);
app.set("views", `${__dirname}/views`);

// Method Override
app.use(methodOverrride("newMethod"));

// Routes
app.use("/", frontendRoutes);
app.use("/user", userRoutes);
app.use("/admin", backendRoutes);

// Starts a server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
