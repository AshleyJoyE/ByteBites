const mongoose = require('mongoose');
const CollectionSchema = new mongoose.Schema({
    collectionName:{
        type: String,
        required: true
    },
    owner_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    }
});
const RecipeCollection = new mongoose.model("RecipeCollection", CollectionSchema);

module.exports = RecipeCollection;
