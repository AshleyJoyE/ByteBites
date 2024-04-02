const mongoose = require('mongoose');
const Review = require('./Review');

const RecipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipePhoto: {
        type: String,
        required: false,
        default: "
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        "
    },
    description: {
        type: String,
        required: false,
        default: function() {
            return `${this.username} has not provided a description!`;
        }
    },
    prepTime: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for prep time'
        }
    },
    cookTime: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for cook time'
        }
    },
    servings: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for servings'
        }
    },
    totalCalories: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for calories'
        }
    },
    ingredients: {
        type: [String],
        required: true
    },
    directions: {
        type: [String],
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    isRecommendedRecipe: {
        type: boolean,
        required: false,
        default: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// virtual property for totalTime
RecipeSchema.virtual('totalTime').get(function() {
    return this.prepTime + this.cookTime;
});

// virtual property for averageRating
RecipeSchema.virtual('averageRating').get(async function() {
    const rev
    iews = await Review.aggregate([
        { $match: { recipe_id: this._id } }, 
        { $group: {
            _id: '$recipe_id',
            averageRating: { $avg: '$rating' }
        }}
    ]);

    if (reviews.length > 0) {
        return reviews[0].averageRating;
    } else {
        return 0; 
    }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
