const mongoose = require('mongoose');

//create a schema
const LeafSchema = new mongoose.Schema({
    author: String,
    content: String,
    created_at: Date,
    updated_at: Date
})

LeafSchema.pre('save', function(next){
    const now = new Date();
    this.updated_at = now;
    if( !this.created_at){
        this.created_at = now;
    }
    next()
});
//turn the schema into a model
const Leaf = mongoose.model('leaf', LeafSchema);

//export 
module.exports = Leaf;