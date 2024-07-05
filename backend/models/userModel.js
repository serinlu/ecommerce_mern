import mongoose from "mongoose";

const sacoSchema = mongoose.Schema({
  pecho_s: { type: Number, required: false },
  cintura_s: { type: Number, required: false },
  cadera_s: { type: Number, required: false },
  hombro_s: { type: Number, required: false },
  manga_s: { type: Number, required: false },
  espalda_s: { type: Number, required: false },
  largo_s: { type: Number, required: false },
  // Otros campos de medidas para saco...
}, { timestamps: true });

const Saco = mongoose.model("Saco", sacoSchema);

// Definir el esquema de medidas para Camisa
const camisaSchema = mongoose.Schema({
  cuello_c: { type: Number, required: false },
  hombro_c: { type: Number, required: false },
  manga_c: { type: Number, required: false },
  espalda_c: { type: Number, required: false },
  pecho_c: { type: Number, required: false },
  cintura_c: { type: Number, required: false },
  cadera_c: { type: Number, required: false },
  puño_c: { type: Number, required: false },
  largo_c: { type: Number, required: false },
  // Otros campos de medidas para camisa...
}, { timestamps: true });

const Camisa = mongoose.model("Camisa", camisaSchema);

// Definir el esquema de medidas para Pantalón
const pantalonSchema = mongoose.Schema({
  largo_p: { type: Number, required: false },
  tiro_p: { type: Number, required: false },
  cintura_p: { type: Number, required: false },
  cadera_p: { type: Number, required: false },
  rodilla_p: { type: Number, required: false },
  boca_p: { type: Number, required: false },
  // Otros campos de medidas para pantalón...
}, { timestamps: true });

const Pantalon = mongoose.model("Pantalon", pantalonSchema);

const userSchema = mongoose.Schema(
  {
    id_usuario: {type: mongoose.Schema.Types.ObjectId, required: false,},
    medida_saco: [sacoSchema],
    medida_pantalon: [pantalonSchema],
    medida_camisa: [camisaSchema],
    nombre: {type: String, required: true,},
    apellido: {type: String, required: true,},
    numCel: {type: String, required: true,},
    email: {type: String, required: true, unique: true,},
    tipoDoc: {type: String, required: true,},
    numDoc: {type: String, required: true,},
    password: {type: String, required: true,},
    isAdmin: {type: Boolean, required: true, default: false,},
    isWorker: {type: Boolean, required: true, default: false,},
    isConfectioner: {type: Boolean, required: true, default: false,},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
export {Saco, Camisa, Pantalon};
