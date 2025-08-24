"use client";

import Link from "next/link";
import { Leaf, ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore, useCartStore } from "@/lib/store";

export function Header() {
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Paisagismo</span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                placeholder="Buscar plantas, ferramentas..."
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* User menu & Cart */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    <span className="hidden md:block">
                      {user.name.split(" ")[0]}
                    </span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-600"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <User className="h-4 w-4 mr-1" />
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Cadastrar</Button>
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-8">
              <Link
                href="/products"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Produtos
              </Link>
              <Link
                href="/products?category=PLANTS"
                className="text-gray-700 hover:text-green-600"
              >
                Plantas
              </Link>
              <Link
                href="/products?category=TOOLS"
                className="text-gray-700 hover:text-green-600"
              >
                Ferramentas
              </Link>
              <Link
                href="/products?category=POTS"
                className="text-gray-700 hover:text-green-600"
              >
                Vasos
              </Link>
              <Link
                href="/products?category=FERTILIZERS"
                className="text-gray-700 hover:text-green-600"
              >
                Fertilizantes
              </Link>
              <Link
                href="/products?category=SEEDS"
                className="text-gray-700 hover:text-green-600"
              >
                Sementes
              </Link>
            </div>

            {/* Mobile search */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
