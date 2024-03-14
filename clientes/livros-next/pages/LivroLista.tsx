import React, { useState, useEffect } from 'react';
import { ControleLivros } from '../classes/controle/ControleLivros';
import { LinhaLivro } from '../componentes/LinhaLivro';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Menu from '../componentes/Menu';
import { Livro } from '../classes/modelo/Livro';

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        const obterLivros = async () => {
            try {
                const data = await ControleLivros.obterLivros();
                setLivros(data);
                setCarregado(true);
            } catch (error) {
                console.error(error);
            }
        };

        if (!carregado) {
            obterLivros();
        }
    }, [carregado]);

    const excluir = async (codigo: string) => {
        try {
            const sucesso = await ControleLivros.excluir(codigo);
            if (sucesso) {
                setCarregado(false);
            } else {
                console.error('Erro ao excluir livro: Ocorreu um erro ao excluir o livro');
            }
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Livros Next</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className={styles.main}>
                <h1 className={styles.title}>Lista de Livros</h1>
                <div className={styles.listaLivros}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Resumo</th>
                                <th>Editora</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map(livro => (
                                <LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default LivroLista;
