const Leaf = require('../models/leaf')

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thanksgiving-tree');

//routes

//create
router.post('/', (req,res) => {
    Leaf.create(req.body)
        .then((newLeaf) => {
            res.json(newLeaf);
        })
        .catch((err) => res.json(err));
})

//read

//index
router.get('/', (req,res) => {
    Leaf.find()
        .then(leaves => {
            res.json(leaves)
        })
        .catch(err => res.json(err))
})

//show
router.get('/:id', (req,res) => {
    Leaf.findById(req.params.id)
        .then(leaf => {
            res.json(leaf)
        })
        .catch((err) => res.json(err));
})






module.exports = router;
