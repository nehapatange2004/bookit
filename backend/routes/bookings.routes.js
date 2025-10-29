import express from 'express';
// import { createBooking, getBookingsByUser } from '../controllers/bookings.controller.js';
import { createBooking, getBookingsByUser } from '../controllers/bookings.controller.js';
import { applyPromo } from '../controllers/promo.controller.js';

const router = express.Router();

//geting all booking details by the user
router.get('/', getBookingsByUser); 


//making a new booking
router.post('/', applyPromo, createBooking);

export default router;