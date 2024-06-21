import express from 'express';
import { validatePantalonMedida } from '../controllers/pantalonMedidaController.js';
import PantalonMedida from '../models/pantalonMedidaModel.js';

const router = express.Router();

router.post('/add', validatePantalonMedida, async (req, res) => {
  try {
    const pantalonMedida = new PantalonMedida(req.body);
    await pantalonMedida.save();
    res.status(201).json(pantalonMedida);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
