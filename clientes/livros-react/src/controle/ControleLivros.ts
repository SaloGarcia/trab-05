import { Livro } from '../modelo/Livro';

const baseURL = 'http://localhost:3030/livros';

interface LivroMongo {
    _id: string | null;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

export class ControleLivros {
    
    static async obterLivros(): Promise<Livro[]> {
        try {
            const response = await fetch(baseURL);
            const livrosMongo: LivroMongo[] = await response.json();
            const livros = livrosMongo.map(livroMongo => ({
                codigo: livroMongo._id || '', // Utilizando _id como código, convertendo para string
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

    static async incluir(novoLivro: Livro): Promise<boolean> {
        try {
            const livroMongo: LivroMongo = {
                _id: null, // O servidor irá gerar o _id
                codEditora: novoLivro.codEditora,
                titulo: novoLivro.titulo,
                resumo: novoLivro.resumo,
                autores: novoLivro.autores
            };

            const response = await fetch(baseURL, {
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

    static async excluir(codigoLivro: string): Promise<boolean> {
        try {
            const response = await fetch(`${baseURL}/${codigoLivro}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            throw error;
        }
    }
}
