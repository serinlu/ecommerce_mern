import mongoose from 'mongoose';

const medidaSchema = mongoose.Schema({
  id_medida: { type: String, required: true, unique: true },
  tipo_medida: { type: String, required: true },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Medida = mongoose.model('Medida', medidaSchema);

export default Medida;
