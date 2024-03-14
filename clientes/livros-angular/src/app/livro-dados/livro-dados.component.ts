import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  livro: Livro;
  autoresForm: string = '';
  editoras: Editora[] = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {
    this.livro = new Livro('0', 0, '', '', []);
  }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir = () => {
    this.livro.autores = this.autoresForm.split('\n');
    this.servLivros.incluir(this.livro).then(() => {
      this.router.navigateByUrl('/lista');
    });
  }
}
