export class Livro {
    codigo: string; // Alteração do tipo de number para string
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];

    constructor(codigo: string, codEditora: number, titulo: string, resumo: string, autores: string[]) {
        this.codigo = codigo;
        this.codEditora = codEditora;
        this.titulo = titulo;
        this.resumo = resumo;
        this.autores = autores;
    }
}
