import { deleteCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  userName: string | null;
  setAuth: (token: string, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userName: null,
  setAuth: (token, name) => {
    setCookie('token_de_acesso', token);
    set({ token, userName: name });
  },
  logout: () => {
    deleteCookie('token_de_acesso');
    set({ token: null, userName: null });
  },
}));