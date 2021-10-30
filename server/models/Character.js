const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        required: true,
    },
    characterName: {
        type: String,
        required: true,
    },
    race: {
        type: String,
        required: true,
    },
    strength: {
        type: Number,
        required: true,
    },
    dexterity: {
        type: Number,
        required: true,
    },
    constitution: {
        type: Number,
        required: true,
    },
    intelligence: {
        type: Number,
        required: true,
    },
    wisdom: {
        type: Number,
        required: true,
    },
    charisma: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("character", CharacterSchema);
