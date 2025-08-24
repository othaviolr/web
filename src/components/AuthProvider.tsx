"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login } = useAuthStore();

  useEffect(() => {
    // Carregar dados do localStorage quando a aplicação iniciar
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          login(user, token);
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
  }, [login]);

  return <>{children}</>;
}
