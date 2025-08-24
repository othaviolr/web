import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lótus - Paisagismo",
  description:
    "Sua loja online de plantas, ferramentas de jardinagem, vasos, fertilizantes e tudo para seu jardim dos sonhos.",
  keywords:
    "plantas, jardinagem, paisagismo, ferramentas, vasos, fertilizantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="light">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <AuthProvider>
          <div className="min-h-screen bg-white">
            <Header />
            <main className="bg-white">{children}</main>
            <footer className="bg-gray-800 text-white py-12 px-4">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Lótus Paisagismo</h3>
                    <p className="text-gray-400">
                      Sua loja online de plantas e acessórios para jardinagem.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Links Rápidos</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <a href="/products" className="hover:text-white">
                          Produtos
                        </a>
                      </li>
                      <li>
                        <a href="/about" className="hover:text-white">
                          Sobre
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="hover:text-white">
                          Contato
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Categorias</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <a
                          href="/products?category=PLANTS"
                          className="hover:text-white"
                        >
                          Plantas
                        </a>
                      </li>
                      <li>
                        <a
                          href="/products?category=TOOLS"
                          className="hover:text-white"
                        >
                          Ferramentas
                        </a>
                      </li>
                      <li>
                        <a
                          href="/products?category=POTS"
                          className="hover:text-white"
                        >
                          Vasos
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Suporte</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <a href="/faq" className="hover:text-white">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a href="/shipping" className="hover:text-white">
                          Entregas
                        </a>
                      </li>
                      <li>
                        <a href="/returns" className="hover:text-white">
                          Devoluções
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
                  <p>&copy;2025 Netuno. Todos os direitos reservados.</p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
