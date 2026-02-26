import Cookies from 'js-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState } from '../app/models/models';

interface AuthStore extends AuthState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setAuth: (token: string, name: string) => {
        Cookies.set('token_de_acesso', token, { expires: 7 });
        set({ token, name });
      },
      logout: () => {
        Cookies.remove('token_de_acesso');
        set({ token: null, name: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);