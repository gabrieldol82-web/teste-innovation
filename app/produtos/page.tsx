"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import ProductCard, { ProductEskeleton } from "../components/Card";
import Header from "./../components/Header";

export default function Produtos() {

    const token = useAuthStore((state) => state.token);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token) {
            fetchProducts();
        }
    }, [token]);

    return (
        <div className="min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <ProductEskeleton key={i} />
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product: any) => (
                                <ProductCard key={product.codigo} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="col-span-full text-center text-slate-500">
                            Nenhum produto disponível.
                        </p>
                    )}
            </div>
        </div>
    )
}
