import mongoose from 'mongoose';

const camisaMedidaSchema = mongoose.Schema({
  id_medida: { type: mongoose.Schema.Types.ObjectId, ref: 'Medida', required: true },
  cuello_medida: Number,
  hombro_medida: Number,
  manga_medida: Number,
  espalda_medida: Number,
  pecho_medida: Number,
  cintura_medida: Number,
  cadera_medida: Number,
  puño_medida: Number,
  largo_medida: Number,
});

const CamisaMedida = mongoose.model('CamisaMedida', camisaMedidaSchema);

export default CamisaMedida;
