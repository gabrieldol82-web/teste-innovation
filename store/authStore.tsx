import { deleteCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => {
    setCookie('token_de_acesso', token, { maxAge: 60 * 60 * 24 * 7 });
    set({ token });
  },
  logout: () => {
    deleteCookie('token_de_acesso');
    set({ token: null });
  },
}));