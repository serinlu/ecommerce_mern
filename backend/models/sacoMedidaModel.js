import mongoose from 'mongoose';

const sacoMedidaSchema = mongoose.Schema({
  id_medida: { type: mongoose.Schema.Types.ObjectId, ref: 'Medida', required: true },
  pecho_medida: Number,
  cintura_medida: Number,
  cadera_medida: Number,
  hombro_medida: Number,
  manga_medida: Number,
  espalda_medida: Number,
  largo_medida: Number,
});

const SacoMedida = mongoose.model('SacoMedida', sacoMedidaSchema);

export default SacoMedida;
