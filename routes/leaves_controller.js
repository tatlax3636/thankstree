const Leaf = require('../models/leaf')

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thanksgiving-tree');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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

//delete one
router.delete('/:id', (req,res) => {
    Leaf.findOneAndRemove({_id: req.params.id})
        .then(() => {
            res.redirect('/leaves')
        })
        .catch((err) => res.json(err))
})

//delete all
router.delete('/', (req,res) => {
    Leaf.findAndRemove()
        .then(leaves => {
            res.json(leaves)
        })
        .catch(err => res.json(err))
})






module.exports = router;
