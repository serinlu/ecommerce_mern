import { check, validationResult } from 'express-validator';

export const validatePantalonMedida = [
  check('id_medida').notEmpty().withMessage('El id de medida es requerido'),
  check('largo_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida del largo debe ser numérica y de máximo 3 caracteres'),
  check('tiro_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida del tiro debe ser numérica y de máximo 3 caracteres'),
  check('cintura_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la cintura debe ser numérica y de máximo 3 caracteres'),
  check('cadera_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la cadera debe ser numérica y de máximo 3 caracteres'),
  check('rodilla_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la rodilla debe ser numérica y de máximo 3 caracteres'),
  check('boca_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la boca debe ser numérica y de máximo 3 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
