import Image from 'next/image';

interface ProductsProps {
    codigo: string;
    nome: string;
    referencia: string;
    codigo_categoria: number;
    imagem: string;
    preco: string;
    descricao: string;
}

export default function ProductCard({ product, onViewDetails }: { product: ProductsProps, onViewDetails: (product: any) => void }) {

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(product.preco));
  
  return (
    <div className="group relative max-w-sm overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100">
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute right-2 top-2 rounded bg-slate-900/5 px-2 py-1 text-[10px] font-medium text-slate-500 backdrop-blur-sm">
          Ref: {product.referencia}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-blue-600">
          Cód: {product.codigo}
        </span>
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            {product.nome}
          </h3>
        
        <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
          {product.descricao}
        </p>

        <p className="text-sm font-semibold text-slate-700 mt-2">
          {precoFormatado}
        </p>
        
        <div className="pt-4">
          <button className="w-full rounded-lg bg-brand-light py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            onClick={() => onViewDetails(product)}>
            Confira
          </button>
        </div>
        
      </div>
    </div>
  );
}

export function ProductEskeleton() {
  return (
    <div className="group relative max-w-sm overflow-hidden rounded-2xl bg-white p-4 shadow-sm border border-slate-100 animate-pulse">
      
      <div className="relative aspect-square w-full rounded-xl bg-slate-200" />

      <div className="flex flex-1 flex-col p-4 space-y-3">
        
        <div className="h-3 w-16 rounded bg-slate-200" />
        
        <div className="h-5 w-full rounded bg-slate-200" />
        
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-5/6 rounded bg-slate-100" />
        </div>

        <div className="pt-4">
          <div className="h-10 w-full rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}