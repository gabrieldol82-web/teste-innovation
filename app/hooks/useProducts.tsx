import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { productFetch } from "../services/productsService";

export const useProducts = () => {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const query = useQuery({
    queryKey: ["products", token],
    queryFn: () => productFetch(token!),
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (query.error?.message === "Sessão expirada") {
      logout();
      window.location.href = "/login";
    }
  }, [query.error, logout]);

  return query;
};