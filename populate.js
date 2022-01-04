const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const productJson = require('./products.json');
require('dotenv').config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(productJson);
    console.log('done');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
