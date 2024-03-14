import React, { useState } from 'react';
import Head from 'next/head';
import Menu from '../componentes/Menu';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { ControleLivros } from '../classes/controle/ControleLivros';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

interface LivroDadosProps {
    navigate: () => void;
}

const LivroDados: React.FC<LivroDadosProps> = ({ navigate }) => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState('0');

    const router = useRouter();

    const opcoes = ControleEditora.getEditoras().map((editora: any) => ({ 
        value: editora.codEditora,
        text: editora.nome
    }));

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const livro = {
            codigo: '', // Alteração: utilizar um texto vazio para o código
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora: parseInt(codEditora)
        };
        try {
            const sucesso = await ControleLivros.incluir(livro);
            if (sucesso) {
                navigate();
            } else {
                console.error('Falha ao incluir livro');
            }
        } catch (error) {
            console.error('Erro ao incluir livro:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Livro Dados</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main>
                <h1>Formulário de Inclusão de Livro</h1>
                <form onSubmit={incluir}>
                    <label>
                        Título:
                        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    </label>
                    <label>
                        Resumo:
                        <textarea value={resumo} onChange={e => setResumo(e.target.value)} />
                    </label>
                    <label>
                        Autores:
                        <textarea value={autores} onChange={e => setAutores(e.target.value)} />
                    </label>
                    <label>
                        Editora:
                        <select value={codEditora} onChange={e => setCodEditora(e.target.value)}>
                            {opcoes.map((opcao: any) => ( 
                                <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Incluir Livro</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;
