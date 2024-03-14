import { Injectable } from '@angular/core';
import { Editora } from './editora';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {
  private editoras: Editora[] = [
    new Editora(1, 'Alta Books'),
    new Editora(2, 'Pearson'),
    new Editora(3, 'Addison Wesley')
  ];

  constructor() { }

  getNomeEditora(codEditora: number): string | undefined {
    const editoraEncontrada = this.editoras.find(editora => editora.codEditora === codEditora);
    return editoraEncontrada ? editoraEncontrada.nome : undefined;
  }

  getEditoras(): Editora[] {
    return this.editoras;
  }
}

