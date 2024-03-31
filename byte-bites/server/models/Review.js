const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    reviewer_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipe_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    description: {
        type: String,
        required: false,
        default: ""
    },
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for rating'
        }
    }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
