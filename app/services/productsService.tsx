import { API_BASE_URL } from "../constants/api";
import { LoginResponse } from "../models/models";

export const productFetch = async (token: string): Promise<LoginResponse[]> => {
    const url = `${API_BASE_URL}/produtos/listar`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor');
    }

    return response.json();
}