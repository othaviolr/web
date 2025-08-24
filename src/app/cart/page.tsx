"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCartStore, useAuthStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15; // Frete grátis acima de R$ 100
  const discount = promoDiscount;
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyPromo = async () => {
    setIsApplyingPromo(true);
    // Simular aplicação de cupom
    setTimeout(() => {
      if (promoCode.toLowerCase() === "desconto10") {
        setPromoDiscount(subtotal * 0.1); // 10% de desconto
      } else if (promoCode.toLowerCase() === "fretegratis") {
        setPromoDiscount(shipping);
      } else {
        alert("Cupom inválido");
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-gray-600 mb-8">
            Adicione alguns produtos incríveis para começar suas compras!
          </p>
          <Link href="/products">
            <Button size="lg">Explorar Produtos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/products"
            className="flex items-center text-gray-600 hover:text-green-600 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar comprando
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Carrinho de Compras ({totalItems}{" "}
            {totalItems === 1 ? "item" : "itens"})
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Limpar carrinho
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    {item.product.images.length > 0 ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        🌱
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        SKU: {item.product.sku}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">
                        Qtd:
                      </span>
                      <div className="flex items-center border border-gray-300 rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="rounded-r-none"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-center min-w-[3rem]">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="rounded-l-none"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-sm text-gray-500">
                          {formatPrice(item.product.price)} cada
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stock Warning */}
                  {item.quantity >= item.product.stock && (
                    <div className="mt-2 text-sm text-orange-600">
                      ⚠️ Quantidade máxima em estoque: {item.product.stock}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cupom de desconto
              </label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite o cupom"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={handleApplyPromo}
                  loading={isApplyingPromo}
                  disabled={!promoCode}
                >
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({totalItems} itens)
                </span>
                <span className="text-gray-900">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="text-gray-900">
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Grátis</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Desconto</span>
                  <span className="text-green-600">
                    -{formatPrice(discount)}
                  </span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Free Shipping Banner */}
            {subtotal < 100 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-2" />
                  <div className="text-sm">
                    <div className="font-medium text-green-800">
                      Faltam {formatPrice(100 - subtotal)} para frete grátis!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <Button onClick={handleCheckout} className="w-full mb-4" size="lg">
              <CreditCard className="h-5 w-5 mr-2" />
              Finalizar Compra
            </Button>

            {/* Security Features */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-600 mr-2" />
                <span>Compra 100% segura</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-4 w-4 text-green-600 mr-2" />
                <span>Entrega em até 3 dias úteis</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t">
              <div className="text-sm font-medium text-gray-900 mb-3">
                Formas de pagamento
              </div>
              <div className="grid grid-cols-4 gap-2">
                {["💳", "💰", "📱", "🏧"].map((icon, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded p-2 text-center text-xl"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
