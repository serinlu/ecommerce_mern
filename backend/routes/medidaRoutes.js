import express from 'express';
import { validateMedida } from '../controllers/medidaController.js';
import Medida from '../models/medidaModel.js';

const router = express.Router();

router.post('/add', validateMedida, async (req, res) => {
  try {
    const medida = new Medida(req.body);
    await medida.save();
    res.status(201).json(medida);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
