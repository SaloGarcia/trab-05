const express = require('express');
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

const router = express.Router();

// Rota para obter todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await obterLivros();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao obter livros' });
  }
});

// Rota para incluir um novo livro
router.post('/', async (req, res) => {
  const livro = req.body;
  try {
    const novoLivro = await incluir(livro);
    res.json({ mensagem: 'Livro incluído com sucesso', livro: novoLivro });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao incluir livro' });
  }
});

// Rota para excluir um livro por código
router.delete('/:codigo', async (req, res) => {
  const codigo = req.params.codigo;
  try {
    const resultado = await excluir(codigo);
    if (resultado.deletedCount === 1) {
      res.json({ mensagem: 'Livro excluído com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir livro' });
  }
});

// Exportar router
module.exports = router;
