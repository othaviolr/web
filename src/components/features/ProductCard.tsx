"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Leaf } from "lucide-react"; // Adicione Leaf aqui
import { Button } from "@/components/ui/Button";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Leaf className="h-12 w-12" />
            </div>
          )}

          {/* Wishlist button */}
          <button
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>

          {/* Stock status */}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Esgotado</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>

          {/* Category badge */}
          <span className="inline-block px-2 py-1 mt-2 text-xs font-medium bg-green-100 text-green-700 rounded">
            {getCategoryLabel(product.category)}
          </span>

          {/* Price and add to cart */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>

            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="group-hover:bg-green-700"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>

          {/* Stock info */}
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-xs text-orange-600 mt-2">
              Apenas {product.stock} em estoque
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function getCategoryLabel(category: Product["category"]): string {
  const labels = {
    PLANTS: "Plantas",
    TOOLS: "Ferramentas",
    POTS: "Vasos",
    FERTILIZERS: "Fertilizantes",
    SEEDS: "Sementes",
    ACCESSORIES: "Acessórios",
  };
  return labels[category];
}
