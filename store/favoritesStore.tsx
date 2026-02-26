import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FavoritesStore } from "../app/models/models";

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (codigo) => {
        const current = get().favorites;
        const exists = current.includes(codigo);
        set({ favorites: exists ? current.filter(c => c !== codigo) : [...current, codigo] });
      },
      isFavorite: (codigo) => get().favorites.includes(codigo),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);