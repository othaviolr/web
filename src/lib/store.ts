import { create } from "zustand";
import { User, Product, CartItem } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoaded: boolean;
  setLoaded: () => void;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Store de autenticação sem persist - vamos usar localStorage manualmente
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoaded: false,

  setLoaded: () => set({ isLoaded: true }),

  login: (user, token) => {
    set({ user, token });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  logout: () => {
    set({ user: null, token: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
}));

// Store do carrinho sem persist
export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      const newItems = items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      set({ items: newItems });
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems));
      }
    } else {
      const newItems = [...items, { product, quantity }];
      set({ items: newItems });
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems));
      }
    }
  },

  removeItem: (productId) => {
    const newItems = get().items.filter(
      (item) => item.product.id !== productId
    );
    set({ items: newItems });
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(newItems));
    }
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const newItems = get().items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ items: newItems });
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(newItems));
    }
  },

  clearCart: () => {
    set({ items: [] });
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));

// Funções para inicializar os stores
export const initializeAuth = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        useAuthStore.setState({ user, token, isLoaded: true });
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        useAuthStore.setState({ isLoaded: true });
      }
    } else {
      useAuthStore.setState({ isLoaded: true });
    }
  }
};

export const initializeCart = () => {
  if (typeof window !== "undefined") {
    const cartStr = localStorage.getItem("cart");
    if (cartStr) {
      try {
        const items = JSON.parse(cartStr);
        useCartStore.setState({ items });
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        localStorage.removeItem("cart");
      }
    }
  }
};
