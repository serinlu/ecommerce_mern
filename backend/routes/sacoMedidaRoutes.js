import express from 'express';
import { validateSacoMedida } from '../controllers/sacoMedidaController.js';
import SacoMedida from '../models/sacoMedidaModel.js';

const router = express.Router();

router.post('/add', validateSacoMedida, async (req, res) => {
  try {
    const sacoMedida = new SacoMedida(req.body);
    await sacoMedida.save();
    res.status(201).json(sacoMedida);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
