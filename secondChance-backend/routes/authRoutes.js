const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

let JWT_SECRET = `${process.env.JWT_SECRET}`;

// Add a new user
router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to `secondChance` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();

        // Task 2: Access MongoDB `users` collection
        const collection = db.collection('users')

        // Task 3: Check if user credentials already exists in the database and throw an error if they do
        let { email, password, firstName, lastName } = req.body;

        const findUser = await collection.findOne({ email });

        if(findUser) {
            logger.error('User already exists');
            return res.status(404).json({ message: "User already exists" });
        }

        // Task 4: Create a hash to encrypt the password so that it is not readable in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Task 5: Insert the user into the database
        const newUser = await collection.insertOne({
            email,
            firstName,
            lastName,
            password: hashedPassword,
            createdAt: new Date()
        })

        // Task 6: Create JWT authentication if passwords match with user._id as payload
        const payload = {
            user: {
                id: newUser.insertedId
            },
        };

        const authToken = jwt.sign(payload, JWT_SECRET);

        // Task 7: Log the successful registration using the logger
        logger.info('User registered successfully');

        // Task 8: Return the user email and the token as a JSON
        return res.json({ authToken, email });
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

module.exports = router;
