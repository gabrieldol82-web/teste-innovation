import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import { useFavoritesStore } from '../../store/favoritesStore';
import { ProductModel } from "../models/models";
import formatCurrency from '../utils/format';

export default function ProductCard({ product, onViewDetails }: { product: ProductModel, onViewDetails: (product: ProductModel) => void }) {

  const precoFormatado = formatCurrency(product.preco);

  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product.codigo));

  return (
    <div className="group flex flex-col max-w-sm rounded-2xl bg-white shadow-sm border border-slate-100">
      
      <div className="relative w-full h-100 bg-white">
        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-2"
        />
        <div className="absolute right-2 top-2 rounded bg-slate-900/5 px-2 py-1 text-[10px] font-medium text-slate-500 backdrop-blur-sm">
          Ref: {product.referencia}
        </div>
        
        <button
          onClick={() => toggleFavorite(product.codigo)}
          className="absolute left-2 top-2 rounded-full bg-white/80 p-1.5 shadow backdrop-blur-sm transition-colors hover:bg-white"
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {isFavorite 
            ? <FavoriteIcon className="text-red-500" fontSize="small" />
            : <FavoriteBorderIcon className="text-slate-400" fontSize="small" />
          }
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-blue-600">
          Cód: {product.codigo}
        </span>
        <p className="text-lg font-bold text-slate-800 tracking-tight">
          {product.nome}
        </p>
        <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
          {product.descricao}
        </p>
        <p className="text-sm font-semibold text-slate-700 mt-2">
          {precoFormatado}
        </p>
        <div className="mt-auto pt-4">
          <button className="w-full rounded-lg bg-brand-light py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-dark cursor-pointer"
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