import React, { useState } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';
import { useNavigate } from 'react-router-dom';

export default function LivroDados() {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(0);
  const opcoes = ControleEditora.getEditoras().map(editora => ({ value: editora.codEditora, text: editora.nome }));
  const navigate = useNavigate();

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const autoresArray = autores.split('\n');
    const novoLivro = {
      codigo: '', // Alteração: utilizar um texto vazio para o código
      codEditora: codEditora,
      titulo: titulo,
      resumo: resumo,
      autores: autoresArray
    };
    ControleLivros.incluir(novoLivro)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Erro ao incluir livro:', error);
      });
  };

  return (
    <main>
      <h1>Incluir Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="resumo" className="form-label">Resumo</label>
          <textarea className="form-control" id="resumo" rows="3" value={resumo} onChange={(e) => setResumo(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
          <textarea className="form-control" id="autores" rows="3" value={autores} onChange={(e) => setAutores(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="editora" className="form-label">Editora</label>
          <select className="form-select" id="editora" value={codEditora} onChange={tratarCombo}>
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Incluir Livro</button>
      </form>
    </main>
  );
}
