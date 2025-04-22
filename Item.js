const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, required: true },
    lowStockThreshold: { type: Number, default: 10 }
});

module.exports = mongoose.model('Item', itemSchema);
