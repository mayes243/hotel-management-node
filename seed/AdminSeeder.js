require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./../models/Admin');

// Configure Mongoose to Connect to Database
const db_connection = process.env.DB_CONNECTION;
mongoose.connect(db_connection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(response => {
        console.log('Database connected for seed data!');
    }).catch(error => {
        console.log('Databse connection failed!');
    });

const admin = new Admin({
    name: 'Online Cafe',
    address: 'New Baneshwor, Kathmandu',
    email: 'admin@admin.com',
    password: 'password123'
});

admin.save(function () {
    exit();
});

function exit() {
    mongoose.disconnect();
    console.log('Seed Data Successfully Injected!!!');
};