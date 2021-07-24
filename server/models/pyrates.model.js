const mongoose = require('mongoose');

const PyrateSchema = new mongoose.Schema({
    pyrateName : {
        type: String,
        required: [true, "The Pyrate´s name is required"],
        minlength: [3, "The Pryvate´s name must be at least 3 characters or longer"]
    },
    imageUrl: {
        type: String,
        required: [true, "The image url is required"],
    },
    treasureChest: {
        type: Number,
        required: [true, "The treasure/s is required"],
        min: 0
    },
    catchPhrase: {
        type: String,
        required: [true, "Catch phrase´s pyrate is required"]
    },
    crewPosition: {
        type: String,
        required: [true, "The crew position is required"]
    },
    pegLeg: {
        type: Boolean,
        required: [true, "The peg leg option is required"]
    },
    eyePatch: {
        type: Boolean,
        required: [true, "The eye patch option is required"]
    },
    hookHand: {
        type: Boolean,
        required: [true, "The hook hand option is required"]
    }
    
}, {timestamps:true});


const Pyrate = mongoose.model("Pyrates", PyrateSchema);

module.exports = Pyrate;