import mongoose from 'mongoose';

const pantalonMedidaSchema = mongoose.Schema({
  id_medida: { type: mongoose.Schema.Types.ObjectId, ref: 'Medida', required: true },
  largo_medida: Number,
  tiro_medida: Number,
  cintura_medida: Number,
  cadera_medida: Number,
  rodilla_medida: Number,
  boca_medida: Number,
});

const PantalonMedida = mongoose.model('PantalonMedida', pantalonMedidaSchema);

export default PantalonMedida;
