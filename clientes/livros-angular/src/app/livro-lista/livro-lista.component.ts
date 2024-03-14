import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  editoras: Editora[] = [];
  livros: Livro[] = [];

  constructor(private servEditora: ControleEditoraService, private servLivros: ControleLivrosService) { }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
    this.servLivros.obterLivros().then(livros => {
      this.livros = livros;
    });
  }

  excluir = (codigoLivro: string) => {
    this.servLivros.excluir(codigoLivro).then(() => {
      this.servLivros.obterLivros().then(livros => {
        this.livros = livros;
      });
    });
  }

  obterNome = (codEditora: number): string => {
    return this.servEditora.getNomeEditora(codEditora) ?? '';
  }
}
