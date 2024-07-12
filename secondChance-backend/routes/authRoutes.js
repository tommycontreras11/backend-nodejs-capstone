const express = require("express");
const router = express.Router();
const connectToDatabase = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../logger");

const JWT_SECRET = `${process.env.JWT_SECRET}`;

// Add a new user
router.post("/register", async (req, res) => {
  try {
    // Task 1: Connect to `secondChance` in MongoDB through `connectToDatabase` in `db.js`.
    const db = await connectToDatabase();

    // Task 2: Access MongoDB `users` collection
    const collection = db.collection("users");

    // Task 3: Check if user credentials already exists in the database and throw an error if they do
    let { email, password, firstName, lastName } = req.body;

    const findUser = await collection.findOne({ email });

    if (findUser) {
      logger.error("User already exists");
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
      createdAt: new Date(),
    });

    // Task 6: Create JWT authentication if passwords match with user._id as payload
    const payload = {
      user: {
        id: newUser.insertedId,
      },
    };

    const authToken = jwt.sign(payload, JWT_SECRET);

    // Task 7: Log the successful registration using the logger
    logger.info("User registered successfully");

    // Task 8: Return the user email and the token as a JSON
    return res.json({ authToken, email });
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});

// Sign in
router.post("/login", async (req, res) => {
  try {
    // Task 1: Connect to `secondChance` in MongoDB through `connectToDatabase` in `db.js`.
    const db = await connectToDatabase();

    // Task 2: Access MongoDB `users` collection
    const collection = db.collection("users");

    // Task 3: Check for user credentials in database
    let { email, password } = req.body;

    const findUser = await collection.findOne({ email });

    if (!findUser) {
      logger.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Task 4: Check if the password matches the encrypted password and send appropriate message on mismatch
    const comparePasswords = await bcrypt.compare(password, findUser.password);

    if (!comparePasswords) {
      logger.error("Passwords do not match");
      return res.status(404).json({ message: "Passwords do not match" });
    }

    // Task 5: Fetch user details from a database
    const userName = findUser.firstName;
    const userEmail = findUser.email;

    // Task 6: Create JWT authentication if passwords match with user._id as payload
    let payload = {
      user: {
        id: findUser._id.toString(),
      },
    };

    const authToken = jwt.sign(payload, JWT_SECRET);

    // Task 7: Log the successful registration using the logger
    logger.info("User sign in successfully");

    // Task 8: Return the user email and the token as a JSON
    return res.json({ authToken, userName, userEmail });
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});

// {Insert it along with other imports} Task 1: Use the `body`,`validationResult` from `express-validator` for input validation
router.put("/update", async (req, res) => {
    const { body, validationResult } = require("express-validator");

    // Task 2: Validate the input using `validationResult` and return an appropriate message if you detect an error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error("Validation errors in update request", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Task 3: Check if `email` is present in the header and throw an appropriate error message if it is not present
    const email = req.headers.email;
    if (!email) {
      logger.error("Email not found in the request headers");
      return res
        .status(400)
        .json({ error: "Email not found in the request headers" });
    }

    // Task 4: Connect to MongoDB
    const db = await connectToDatabase();

    // Task 5: Find the user credentials in database
    const collection = db.collection("users");

    const findUser = await collection.findOne({ email });
    if (!findUser) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    findUser.firstName = req.body.name;
    findUser.updatedAt = new Date();

    // Task 6: Update the user credentials in the database
    const updatedUser = await collection.findOneAndUpdate(
      { email },
      { $set: findUser },
      { returnDocument: "after" }
    );
    // Task 7: Create JWT authentication with `user._id` as a payload using the secret key from the .env file
    const payload = {
      user: {
        id: updatedUser._id.toString(),
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);

    return res.json({ authtoken });
  } catch (e) {
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;
