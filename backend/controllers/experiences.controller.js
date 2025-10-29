import Experience from "../models/Experience.js";

export const getAllExperiences = async (req, res) => {
  // Logic to get all experiences
  try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (err) {
        console.error("Error fetching experiences:", err);
        res.status(500).send("Internal Server Error");
    }
}


export const getExperienceById = async (req, res) => {
  // Logic to get experience by ID
   try {
        const id = req.params.id;
        const experiences = await Experience.findById(id);
        res.json(experiences);
    } catch (err) {
        console.error("Error fetching experiences:", err);
        res.status(500).send("Internal Server Error");
    }
}