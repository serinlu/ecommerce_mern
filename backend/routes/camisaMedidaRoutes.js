import express from 'express';
import { validateCamisaMedida } from '../controllers/camisaMedidaController.js';
import CamisaMedida from '../models/camisaMedidaModel.js';

const router = express.Router();

router.post('/add', validateCamisaMedida, async (req, res) => {
  try {
    const camisaMedida = new CamisaMedida(req.body);
    await camisaMedida.save();
    res.status(201).json(camisaMedida);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
