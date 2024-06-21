import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import { check, validationResult } from "express-validator";

const validateUser = [
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('apellido').notEmpty().withMessage('El apellido es requerido'),
  check('numCel').notEmpty().withMessage('El número de celular es requerido'),
  check('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  check('tipoDoc').isIn(['DNI', 'C.E', 'Pasaporte']).withMessage('Tipo de documento inválido'),
  check('numDoc')
    .custom((value, { req }) => {
      if (req.body.tipoDoc === 'DNI' && value.length !== 8) {
        throw new Error('El DNI debe tener 8 dígitos');
      }
      if ((req.body.tipoDoc === 'C.E' || req.body.tipoDoc === 'Pasaporte') && value.length > 20) {
        throw new Error('El número de C.E o Pasaporte no puede tener más de 20 dígitos');
      }
      return true;
    }).withMessage('Número de documento inválido'),
  check('password').notEmpty().withMessage('La contraseña es requerida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const createUser = asyncHandler(async (req, res) => {
  const { nombre, apellido, numCel, email, tipoDoc, numDoc, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("El usuario ya existe");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ nombre, apellido, numCel, email, tipoDoc, numDoc, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      numCel: newUser.numCel,
      email: newUser.email,
      tipoDoc: newUser.tipoDoc,
      numDoc: newUser.numDoc,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Datos de usuario inválidos");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        nombre: existingUser.nombre,
        apellido: existingUser.apellido,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    } else {
      res.status(401);
      throw new Error("Contraseña incorrecta");
    }
  } else {
    res.status(401);
    throw new Error("Usuario no encontrado");
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Deslogeado exitosamente" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado.");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.nombre = req.body.nombre || user.nombre;
    user.apellido = req.body.apellido || user.apellido;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      apellido: updatedUser.apellido,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("El usuario admin no puede ser eliminado");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "Usuario removido" });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.nombre = req.body.nombre || user.nombre;
    user.apellido = req.body.apellido || user.apellido;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      apellido: updatedUser.apellido,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  validateUser,
};
