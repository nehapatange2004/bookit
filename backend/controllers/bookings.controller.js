import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
    try {
        const { user, experience, date, time, total, quantity, code} = req.body;
        
        // const userId = req.user.id || "demo_user"; // Assuming user ID is available in req.user     
        const newBooking = new Booking({
            user: "demo_user",
            experience,
            date,
            time,
            total,
            quantity,
            promo:code?code:""
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).send("Internal Server Error");
    }

}
export const getBookingsByUser = async (req, res) => {
    // Logic to get all bookings by a user
    try {
        const userId = req.user.id || "demo_user"; // Assuming user ID is available in req.user
        const bookings = await Booking.find({ "user": user }).populate('experience');
        res.json(bookings);

    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).send("Internal Server Error");
    }

}