
const mongoose = require('./conexao');

const LivroSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: false },
  titulo: { type: String, required: true },
  codEditora: { type: Number },
  resumo: { type: String },
  autores: { type: [String] }
});

const Livro = mongoose.model('Livro', LivroSchema, 'livros');

module.exports = Livro;
