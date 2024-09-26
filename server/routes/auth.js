import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';

import { UserSchema } from '../models/User.js';
import { Booking } from '../models/Booking.js';
import { Review } from '../models/Review.js';

dotenv.config();
export const router = express.Router();


router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));


router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
});

// Route 1: Registering A New User: POST: http://localhost:8181/api/auth/register. No Login Required
router.post('/register', [
    body('email', "Please Enter a Vaild Email").isEmail(),
    body('name', "Username should be at least 4 characters.").isLength({ min: 4 }),
    body('password', "Password Should Be At Least 8 Characters.").isLength({ min: 8 }),
    body('phone', "Phone Number Should Be 10 Digits.").isLength({ min: 10 }),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const checkMultipleUser1 = await UserSchema.findOne({ email: req.body.email });
        if (checkMultipleUser1) {
            return res.status(403).json({ error: "A User with this email address already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = await UserSchema.create({
            role: req.body.role,
            email: req.body.email,
            name: req.body.name,
            password: hash,
            phone: req.body.phone,
            createdAt: Date(),
        });

        const payload = {
            user: {
                id: newUser.id,
            }
        }
        const authtoken = jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: '7d' },
        );
        res.json({ authtoken });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }

});

router.post('/login', [
    body('email', "Please Enter a Vaild Email").isEmail(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const theUser = await UserSchema.findOne({ email: req.body.email }); // <-- Change req.body.username to req.body.name

        if (theUser) {
            let checkHash = await bcrypt.compare(req.body.password, theUser.password);
            if (checkHash) {
                let payload = {
                    user: {
                        id: theUser.id
                    }
                }
                const authtoken = jwt.sign(payload, process.env.JWT_SECRET);

                return res.status(200).json({ authtoken, name: theUser.name });
            } else {
                return res.status(403).json({ error: "Invalid Credentials" });
            }
        } else {
            return res.status(403).json({ error: "Invalid Credentials" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


router.put('/update', [
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;

        const existingUser = await UserSchema.findOne({ username: name });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.name = name;
        existingUser.updatedAt = Date();

        const updatedUser = await existingUser.save();

        const payload = {
            user: {
                id: updatedUser.id,
            },
        };

        const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

// Route 4: Fetch user data based on the email: GET: http://localhost:8181/api/auth/user
router.get('/user/profile/:email', async (req, res) => {
    try {

        const user = await UserSchema.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send only the necessary user details to the client
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        res.json(userDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
router.patch('/user/update', [
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, name, phone } = req.body;
        const existingUser = await UserSchema.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const updatedUser = await UserSchema.updateOne({ email }, { $set: { name, phone, updatedAt: Date() } });

        const payload = {
            user: {
                id: updatedUser.id,
            },
        };

        const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//search doctors
router.get('/user/search', async (req, res) => {
    try {
        const doctors = await UserSchema.find({ role: "doctor" });
        return res.json(doctors);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//get doctor by id
router.get('/doctor/:id', async (req, res) => {
    try {
        const doctors = await UserSchema.findById(req.params.id);
        return res.json(doctors);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//fetch user by email
router.get('/booking/:email', async (req, res) => {

    try {
        const booking = await Booking.findOne({ email: req.params.email });
        return res.json(booking);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//create booking
router.post('/booking/new', async (req, res) => {
    try {
        const { firstName, phone, appointmentDate, email, timeSlot, doctorId, bookingType } = req.body;
        const newBooking = new Booking({
            firstName,
            phone,
            email,
            appointmentDate: bookingType !== "instant" ? appointmentDate : Date(),
            timeSlot: bookingType !== "instant" ? timeSlot : null,
            doctorId,
            bookingType,
        });
        //check if booking with doctor id arleady exist
        const existingBooking = await Booking.findOne({ email });
        if (existingBooking) {
            return res.status(403).json({ error: "Booking with this doctor already exists" });
        }
        const updateBooking = await newBooking.save();
        return res.json(updateBooking);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//delete booking
router.delete('/booking/delete/:doctorId', async (req, res) => {
    console.log(req.params.doctorId);
    try {
        const bookings = await Booking.find({ doctorId: req.params.doctorId });
        if (!bookings) {
            return res.status(404).json({ error: "Booking not found" });
        }
        await Booking.deleteOne({ doctorId: req.params.doctorId });
        return res.json(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//give review
router.post('/review/new', async (req, res) => {
    try {
        const { name, rating, feedback, doctorId, email } = req.body;
        const newReview = new Review({
            name,
            email,
            doctorId,
            rating,
            feedback,
        });
        const updateReview = await newReview.save();

        return res.json(updateReview);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//find review
router.get('/review/:email', async (req, res) => {
    try {
        const reviews = await Review.find({ email: req.params.email });
        return res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//find all review
router.get('/review', async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});
//find user by email
