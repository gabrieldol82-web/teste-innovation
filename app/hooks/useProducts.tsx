import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { productFetch } from "../services/productsService";

export const useProducts = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["products", token],
    queryFn: async () => {
      const response = await productFetch(token!);
      
      if (response && response.status === "error") {
        throw new Error(response.mensagem || "Falha na autenticação");
      }
      
      return response; 
    },
    enabled: !!token,
    retry: false,
  });
};