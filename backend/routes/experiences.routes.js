import express from 'express';
import { getAllExperiences, getExperienceById } from '../controllers/experiences.controller.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

//not in use currently
router.post('/', (req, res) => {
  res.send('Create a new experience');
}); 


export default router;  