"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useMemo, useState } from "react";
import ProductCard, { ProductEskeleton } from "../components/Card";
import ProductModal from "../components/ProductModal";
import { ProductModel } from "../models/models";
import Header from "./../components/Header";

type SortOption = "nome" | "preco-crescente" | "preco-decrescente" | "";

export default function Produtos() {
    const token = useAuthStore((state) => state.token);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>("");
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);

    const fetchProducts = async () => {
        console.log("Token:", token);
        setIsLoading(true);
        
        try {
            const response = await fetch('https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos/listar', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();

            setProducts(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchProducts();
        }
    }, [token]);

    const sortedProducts = useMemo(() => {
        const list = [...products]; 

        switch (sortBy) {
            case "nome":
                return list.sort((a, b) => a.nome.localeCompare(b.nome));
            case "preco-crescente":
                return list.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
            case "preco-decrescente":
                return list.sort((a, b) => parseFloat(b.preco) - parseFloat(a.preco));
            default:
                return list;
        }
    }, [products, sortBy]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-800">Nossos Produtos</h1>
                    
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm font-medium text-slate-600">Ordenar por:</label>
                        <select 
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Padrão</option>
                            <option value="nome">Nome (A-Z)</option>
                            <option value="preco-crescente">Menor Preço</option>
                            <option value="preco-decrescente">Maior Preço</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductEskeleton key={i} />
                        ))}
                    </div>
                ) : sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sortedProducts.map((product: ProductModel) => (
                            <ProductCard key={product.codigo} product={product} onViewDetails={(product) => setSelectedProduct(product)} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-slate-500 font-medium">Nenhum produto disponível no momento.</p>
                    </div>
                )}
            </div>
            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}