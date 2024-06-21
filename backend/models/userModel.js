import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    id_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    id_medida: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    numCel: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tipoDoc: {
      type: String,
      required: true,
    },
    numDoc: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isWorker: {
      type: Boolean,
      required: true,
      default: false,
    },
    isConfectioner: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
