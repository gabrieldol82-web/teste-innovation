"use client";

import { useAuthStore } from "@/store/authStore";
import { Pagination, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ProductCard, { ProductEskeleton } from "../components/Card";
import ProductModal from "../components/ProductModal";
import { useProducts } from "../hooks/useProducts";
import { ProductModel } from "../models/models";

type SortOption = "nome" | "preco-crescente" | "preco-decrescente" | "";

export default function Produtos() {
    const [sortBy, setSortBy] = useState<SortOption>("");
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const ITEMS_PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const { 
        data: products, 
        isLoading, 
        error,
        refetch 
    } = useProducts();

    const { _hasHydrated } = useAuthStore();

    useEffect(() => {
        console.log(isLoading);
        setCurrentPage(1);
    }, [sortBy]);

    const sortedProducts = useMemo(() => {
        const list = Array.isArray(products) ? [...products] : [];

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

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedProducts, currentPage]);

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

    if (!_hasHydrated || isLoading) {
        return (
            <section className="min-h-screen bg-slate-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductEskeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-red-500 font-medium">
                            Erro ao carregar produtos. 
                            <button 
                                onClick={() => refetch()}
                                className="ml-2 text-blue-500 underline"
                            >
                                Tentar novamente
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50">
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
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {paginatedProducts.map((product: ProductModel) => (
                                <ProductCard key={product.codigo} product={product} onViewDetails={(product) => setSelectedProduct(product)} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <Stack spacing={2}>
                                    <Pagination 
                                        count={totalPages} 
                                        page={currentPage} 
                                        onChange={(_, value) => setCurrentPage(value)} 
                                        variant="outlined" 
                                        shape="rounded"
                                    />
                                </Stack>
                            </div>
                        )}
                    </>
                )}
            </div>
            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
}