import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { nombre, apellido, numCel, email, tipoDoc, numDoc, password, medida_saco, medida_camisa, medida_pantalon } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("El usuario ya existe");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ nombre, apellido, numCel, email, tipoDoc, numDoc, password: hashedPassword, medida_saco, medida_pantalon, medida_camisa });

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
      medida_saco,
      medida_camisa,
      medida_pantalon,
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
        numCel: existingUser.numCel,
        email: existingUser.email,
        tipoDoc: existingUser.tipoDoc,
        numDoc: existingUser.numDoc,
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
      numCel: user.numCel,
      email: user.email,
      tipoDoc: user.tipoDoc,
      numDoc: user.numDoc,
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
    user.numCel = req.body.numCel || user.numCel;
    user.email = req.body.email || user.email;
    user.tipoDoc = req.body.tipoDoc || user.tipoDoc;
    user.numDoc = req.body.numDoc || user.numDoc;

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
      numCel: updatedUser.numCel,
      email: updatedUser.email,
      tipoDoc: updatedUser.tipoDoc,
      numDoc: updatedUser.numDoc,
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
    user.numCel = req.body.numCel || user.numCel;
    user.email = req.body.email || user.email;
    user.tipoDoc = req.body.tipoDoc || user.tipoDoc;
    user.numDoc = req.body.numDoc || user.numDoc;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      apellido: updatedUser.apellido,
      numCel: updatedUser.numCel,
      email: updatedUser.email,
      tipoDoc: updatedUser.tipoDoc,
      numDoc: updatedUser.numDoc,
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
};
