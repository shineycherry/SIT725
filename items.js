const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).send('Error retrieving items');
    }
});

// POST add new item
router.post('/', async (req, res) => {
    const { name, category, quantity } = req.body;
    if (!name || !quantity) {
        return res.status(400).send('Missing required fields');
    }

    const item = new Item({ name, category, quantity });
    try {
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(500).send('Error saving item');
    }
});

// PUT update item by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).send('Item not found');
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).send('Error updating item');
    }
});

module.exports = router;
