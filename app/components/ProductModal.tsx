import Image from 'next/image';
import { useEffect } from 'react';
import { ProductModalProps } from '../models/models';
import formatCurrency from '../utils/format';

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Fechar modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={product.imagem}
              alt={product.nome}
              fill
              className="object-contain p-6"
            />
          </div>

          <div className="flex flex-col p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Ref: {product.referencia}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 leading-tight">
              {product.nome}
            </h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed overflow-y-auto max-h-40">
              {product.descricao}
            </p>

            <div className="mt-auto pt-6">
              <p className="text-3xl font-bold text-slate-900">
                {formatCurrency(product.preco)}
              </p>
              <button className="mt-6 w-full rounded-xl bg-brand-light hover:bg-brand-dark py-4 text-sm font-semibold text-white transition-all cursor-pointer active:scale-95">
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}