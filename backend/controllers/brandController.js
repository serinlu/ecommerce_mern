import Brand from "../models/brandModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "El nombre es obligatorio" });
    }

    const existingBrand = await Brand.findOne({ name });

    if (existingBrand) {
      return res.json({ error: "La marca ya existe" });
    }

    const brand = await new Brand({ name }).save();
    res.json(brand);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { brandId } = req.params;

    const brand = await Brand.findOne({ _id: brandId });

    if (!brand) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    brand.name = name;

    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const removeBrand = asyncHandler(async (req, res) => {
  try {
    const removed = await Brand.findByIdAndRemove(req.params.brandId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const listBrands = asyncHandler(async (req, res) => {
  try {
    const all = await Brand.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

const readBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id });
    res.json(brand);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createBrand,
  updateBrand,
  removeBrand,
  listBrands,
  readBrand,
};
