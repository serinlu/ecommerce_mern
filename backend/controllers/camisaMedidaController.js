import { check, validationResult } from 'express-validator';

export const validateCamisaMedida = [
  check('id_medida').notEmpty().withMessage('El id de medida es requerido'),
  check('cuello_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida del cuello debe ser numérica y de máximo 3 caracteres'),
  check('hombro_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida del hombro debe ser numérica y de máximo 3 caracteres'),
  check('manga_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la manga debe ser numérica y de máximo 3 caracteres'),
  check('espalda_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la espalda debe ser numérica y de máximo 3 caracteres'),
  check('pecho_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida del pecho debe ser numérica y de máximo 3 caracteres'),
  check('cintura_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la cintura debe ser numérica y de máximo 3 caracteres'),
  check('cadera_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida de la cadera debe ser numérica y de máximo 3 caracteres'),
  check('puño_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida del puño debe ser numérica y de máximo 3 caracteres'),
  check('largo_medida').isNumeric().isLength({ max: 3 }).withMessage('La medida del largo debe ser numérica y de máximo 3 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
