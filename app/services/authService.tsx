import { API_BASE_URL } from "../constants/api";

export const loginFecth = async (credentials: { email: string; senha: string }) => {
    const url = `${API_BASE_URL}/login/acessar`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })

    if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor');
    }

    return response.json();
}