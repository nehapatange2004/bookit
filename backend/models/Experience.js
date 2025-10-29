import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  availableDates: [{ type: Date }],      // ✅ Array of dates
  availableTimes: [{ type: String }],    // ✅ Array of strings
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
