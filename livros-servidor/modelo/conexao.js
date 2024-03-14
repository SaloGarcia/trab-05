const mongoose = require('mongoose');

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/livraria')
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = mongoose;
