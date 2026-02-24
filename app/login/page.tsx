"use client";

import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Image from "next/image";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function Login() {

    const [data, setData] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const submitLogin = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);

        const loginData = {
            email: data.username,
            senha: data.password
        };

        try {
            const response = await fetch('https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();
            console.log(result);

            // A API retorna status: 1 para sucesso e status: 0 para erro 
            if (result.status === 1) {
                // console.log("Sucesso:", result.token_de_acesso);
                // 1. Salvar o token no Cookie (para o Middleware ler)
                // 2. Salvar no Zustand (Estado global)
                // 3. Redirecionar para /produtos [cite: 138]
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: result.message || 'Usuário ou senha inválidos.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        } catch (error) {
            Swal.fire('Erro', 'Falha na conexão com o servidor', 'error');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className="relative flex min-h-screen items-center justify-center bg-gray-100 p-4">

            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg-login.jpg"
                    alt="Foto de background"
                    fill
                    className="object-cover opacity-50"
                />
            </div>

            <div className="z-10 w-full max-w-[400px] space-y-6 text-center">
                <h1 className="text-xl font-bold text-brand-dark md:text-2xl">
                    Bem-vindo a Innovation Brindes
                </h1>

                <div className="bg-brand-light rounded-3xl p-8 shadow-2xl md:p-12">
                    <form className="flex flex-col gap-4">

                        <div className="relative">
                            <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Usuário"
                                className="w-full rounded-full border-none py-3 pl-12 pr-4 outline-none bg-white focus:ring-2 focus:ring-brand-dark"
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="password"
                                placeholder="Senha"
                                className="w-full rounded-full border-none py-3 pl-12 pr-4 outline-none bg-white focus:ring-2 focus:ring-brand-dark"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center justify-between px-2 text-[10px] text-white md:text-xs">
                            <label className="flex items-center gap-1 cursor-pointer">
                                <input type="checkbox" className="accent-brand-dark" />
                                Manter logado
                            </label>
                            <button type="button" className="hover:underline">
                                Esqueceu a senha?
                            </button>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="mt-4 w-full rounded-full bg-white py-3 font-semibold text-gray-600 transition-transform active:scale-95 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={submitLogin}
                        >
                            {isLoading ? 'Carregando...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}