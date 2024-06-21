import { check, validationResult } from 'express-validator';

export const validateMedida = [
  check('id_medida').notEmpty().withMessage('El id de medida es requerido'),
  check('tipo_medida').notEmpty().withMessage('El tipo de medida es requerido'),
  check('id_usuario').notEmpty().withMessage('El id de usuario es requerido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
