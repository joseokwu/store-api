const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'Price must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'marcos', 'liddy', 'caressa'],
      message: '{VALUE} is not supported',
    },
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);
