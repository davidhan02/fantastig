const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const keys = require("../config/keys");
const User = require("../models/User");
const checkObjectId = require("../middleware/checkObjectId");
const Character = require("../models/Character");
const auth = require("../middleware/auth");

// @route   GET api/characters
// @desc    Get all characters
// @access  Public
router.get("/", async (req, res) => {
    try {
        const characters = await Character.find().sort({ date: -1 });
        res.json(characters);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/characters
// @desc    Create character route
// @access  Private
router.post(
    "/",
    auth,
    [
        check("characterName", "character name is required").not().isEmpty(),
        check("race", "race is required").not().isEmpty(),
        check("strength", "strength is required").not().isEmpty(),
        check("strength", "strength must be from 1 to 20").isInt({
            min: 1,
            max: 20,
        }),
        check("dexterity", "dexterity is required").not().isEmpty(),
        check("dexterity", "dexterity must be from 1 to 20").isInt({
            min: 1,
            max: 20,
        }),
        check("constitution", "constitution is required").not().isEmpty(),
        check("constitution", "constitution must be from 1 to 20").isInt({
            min: 1,
            max: 20,
        }),
        check("intelligence", "intelligence is required").not().isEmpty(),
        check("intelligence", "intelligence must be from 1 to 20").isInt({
            min: 1,
            max: 20,
        }),
        check("wisdom", "wisdom is required").not().isEmpty(),
        check("wisdom", "wisdom must be from 1 to 20").isInt({
            min: 1,
            max: 20,
        }),
        check("charisma", "charisma is required").not().isEmpty(),
        check("charisma", "charisma must be from 1 to 20").isInt({
            min: 1,
            max: 20,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select("-password");
            const {
                characterName,
                race,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
            } = req.body;

            let foundCharacter = await Character.findOne({ characterName });
            if (foundCharacter) {
                console.log(foundCharacter);
                return res.status(400).json({
                    error: [{ msg: "character with that name already exists" }],
                });
            }

            const newCharacter = new Character({
                user: req.user.id,
                name: user.name,
                characterName,
                race,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
            });

            const character = await newCharacter.save();

            res.json(character);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

// @route PUT /characters/:id
// @desc update character
// @access Private
router.put("/:id", auth, checkObjectId("id"), async (req, res) => {
    try {
        let character = await Character.findById(req.params.id);
        if (!character)
            return res.status(404).json({ msg: "Character not found" });
        // Make sure user owns the character
        if (character.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        character = await Character.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.send(character);
    } catch (err) {
        console.errors(err.message);
        res.status(500).send("Server error");
    }
});

// @route DELETE /characters/:id
// @desc Delete a character
// @access Private
router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
    try {
        let character = await Character.findById(req.params.id);
        if (!character)
            return res.status(404).json({ msg: "Character not found" });
        // Make sure user owns the character
        if (character.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        await Character.findByIdAndRemove(req.params.id);
        res.send("Character deleted successfully");
    } catch (err) {
        console.errors(err.message).json("Server error");
    }
});

module.exports = router;
