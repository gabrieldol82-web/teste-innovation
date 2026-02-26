import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { productFetch } from "../services/productsService";

export const useProducts = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["products", token],
    queryFn: () => productFetch(token!),
    enabled: !!token,
    retry: false,
  });
};