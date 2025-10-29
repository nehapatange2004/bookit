import express from 'express';
import { applyPromo } from '../controllers/promo.controller.js';
const router = express.Router();

// router.post('/', applyPromo);
router.post('/apply', applyPromo, async(req, res) => {
    return res.json({valid: true, message: "Promo code applied successfully", promoResult: req.promoResult});
});


export default router;