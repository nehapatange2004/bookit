import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import experiencesRoutes from "./routes/experiences.routes.js";
import bookingRoutes from "./routes/bookings.routes.js";
import PromoRoutes from "./routes/promo.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
app.use("/experiences", experiencesRoutes);
app.use("/bookings", bookingRoutes);
app.use("/promo", PromoRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.get("/", async (req, res) => {
    try {
        // Experience.insertMany([
        //     {
        //         title: "Kayaking",
        //         description: "Curated small-group experience. Certified guide. Safety first with gear included.",
        //         location: "Uttapi",
        //         price: 999,
        //         image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        //         category: "Water Sports",
        //         availableDates: ["2025-10-22", "2025-10-23", "2025-10-24", "2025-10-26"],
        //         availableTimes: ["07:00", "09:00", "11:00", "13:00"]
        //     },
        //     {
        //         title: "Mountain Trek",
        //         description: "Guided hike through scenic routes with complimentary snacks and refreshments.",
        //         location: "Chikmagalur",
        //         price: 1599,
        //         image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
        //         category: "Adventure",
        //         availableDates: ["2025-10-20", "2025-10-21", "2025-10-23", "2025-10-25"],
        //         availableTimes: ["06:00", "08:00", "10:00"]
        //     },
        //     {
        //         title: "Scuba Diving",
        //         description: "Dive into the depths with certified instructors. All equipment provided.",
        //         location: "Goa",
        //         price: 3499,
        //         image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        //         category: "Water Sports",
        //         availableDates: ["2025-10-19", "2025-10-22", "2025-10-24", "2025-10-26"],
        //         availableTimes: ["08:00", "10:00", "12:00"]
        //     },
        //     {
        //         title: "Camping Night",
        //         description: "Starlit night in nature with bonfire, games, and local cuisine.",
        //         location: "Sakleshpur",
        //         price: 1799,
        //         image: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=800&q=80",
        //         category: "Nature",
        //         availableDates: ["2025-10-21", "2025-10-22", "2025-10-23"],
        //         availableTimes: ["18:00"]
        //     },
        //     {
        //         title: "Boat Cruise",
        //         description: "Luxury sunset cruise with live music and dinner.",
        //         location: "Bangalore",
        //         price: 2499,
        //         image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        //         category: "Leisure",
        //         availableDates: ["2025-10-20", "2025-10-22", "2025-10-24"],
        //         availableTimes: ["17:00", "19:00"]
        //     },
        //     {
        //         title: "Paragliding",
        //         description: "Fly high with professional pilots and breathtaking views.",
        //         location: "Nandi Hills",
        //         price: 2999,
        //         image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
        //         category: "Adventure",
        //         availableDates: ["2025-10-20", "2025-10-22", "2025-10-25"],
        //         availableTimes: ["07:00", "09:00", "11:00"]
        //     },
        //     {
        //         title: "Coffee Trail",
        //         description: "Curated small-group experience. Certified guide. Safety first with gear included.",
        //         location: "Coorg",
        //         price: 1299,
        //         image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
        //         category: "Nature"
        //     }
        // ]
        // ).then(() => {
        //     console.log("Sample experiences inserted");
        // }).catch((err) => {
        //     console.error("Error inserting sample experiences:", err);
        // });

        res.send("Backend server is running");

    } catch (err) {
        console.error("Error in root route:", err);
        res.status(500).send("Internal Server Error");
    }

});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
