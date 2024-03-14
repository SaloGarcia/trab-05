// controle-livros.service.ts
import { Injectable } from '@angular/core';
import { Livro } from './livro';

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  private readonly baseURL = 'http://localhost:3030/livros';

  constructor() { }

  async obterLivros(): Promise<Livro[]> {
    try {
      const response = await fetch(this.baseURL);
      const livrosMongo: LivroMongo[] = await response.json();
      const livros = livrosMongo.map(livroMongo => ({
        codigo: livroMongo._id || '',
        codEditora: livroMongo.codEditora,
        titulo: livroMongo.titulo,
        resumo: livroMongo.resumo,
        autores: livroMongo.autores
      }));
      return livros;
    } catch (error) {
      console.error('Erro ao obter livros:', error);
      throw error;
    }
  }

  async incluir(novoLivro: Livro): Promise<boolean> {
    try {
      const livroMongo: LivroMongo = {
        _id: null,
        codEditora: novoLivro.codEditora,
        titulo: novoLivro.titulo,
        resumo: novoLivro.resumo,
        autores: novoLivro.autores
      };

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(livroMongo)
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao incluir livro:', error);
      throw error;
    }
  }

  async excluir(codigoLivro: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/${codigoLivro}`, {
        method: 'DELETE'
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      throw error;
    }
  }
}

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}
