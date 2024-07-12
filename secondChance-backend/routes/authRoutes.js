const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../logger');

const JWT_SECRET = `${process.env.JWT_SECRET}`;

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

// Sign in
router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to `secondChance` in MongoDB through `connectToDatabase` in `db.js`.
        const db = await connectToDatabase();

        // Task 2: Access MongoDB `users` collection
        const collection = db.collection('users')

        // Task 3: Check for user credentials in database
        let { email, password } = req.body;

        const findUser = await collection.findOne({ email });

        if(!findUser) {
            logger.error('User not found');
            return res.status(404).json({ message: "User not found" });
        }

        // Task 4: Check if the password matches the encrypted password and send appropriate message on mismatch
        const comparePasswords = await bcrypt.compare(password, findUser.password);

        if(!comparePasswords) {
            logger.error('Passwords do not match');
            return res.status(404).json({ message: "Passwords do not match" });
        }

        // Task 5: Fetch user details from a database
        const userName = theUser.firstName;
        const userEmail = theUser.email;
        
        // Task 6: Create JWT authentication if passwords match with user._id as payload
        let payload = {
            user: {
                id: findUser._id.toString(),
             },
         };

        const authToken = jwt.sign(payload, JWT_SECRET);

        // Task 7: Log the successful registration using the logger
        logger.info('User sign in successfully');

        // Task 8: Return the user email and the token as a JSON
        return res.json({ authToken, userName, userEmail });
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

module.exports = router;
