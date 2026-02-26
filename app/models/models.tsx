export interface ProductModel {
    codigo: string;
    nome: string;
    referencia: string;
    codigo_categoria: number;
    imagem: string;
    preco: string;
    descricao: string;
}

export interface AuthState {
  token: string | null;
  name: string | null;
  setAuth: (token: string, name: string) => void;
  logout: () => void;
}