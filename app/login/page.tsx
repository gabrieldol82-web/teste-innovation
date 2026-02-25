"use client";

import { useAuthStore } from "@/store/authStore";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function Login() {

    const setAuth = useAuthStore((state: any) => state.setAuth);
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitLogin = async (e: any) => {
        e.preventDefault();

        const url = 'https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar';

        setIsLoading(true);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result);

            if (result.status) {

                setAuth(result.token_de_acesso, result.dados_usuario.nome_usuario);

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                });

                await Toast.fire({ icon: 'success', title: 'Login realizado!' });
                router.push('/produtos')
            } else {
                Swal.fire({
                    title: 'Ops...',
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
                <h1 className="text-2xl font-bold text-brand-dark md:text-2xl">
                    Bem-vindo a Innovation Brindes
                </h1>

                <div className="bg-brand-light rounded-3xl p-8 shadow-2xl md:p-12">
                    <form className="flex flex-col gap-4" onSubmit={submitLogin}>

                        <div className="relative">
                            <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Usuário"
                                className="w-full rounded-full border-none py-3 pl-12 pr-4 outline-none bg-white focus:ring-2 focus:ring-brand-dark"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                            />
                        </div>

                        <div className="relative">
                            <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="password"
                                placeholder="Senha"
                                className="w-full rounded-full border-none py-3 pl-12 pr-4 outline-none bg-white focus:ring-2 focus:ring-brand-dark"
                                required
                                value={formData.senha}
                                onChange={handleChange}
                                name="senha"
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
                        >
                            {isLoading ? 'Carregando...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}