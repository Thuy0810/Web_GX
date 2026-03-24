"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowLeft,
  Star,
  Truck,
  RefreshCw,
  Headphones,
  BookOpen,
} from "lucide-react";
import { getProductById, allProducts } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { ProductCard } from "@/components/product-card";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const product = getProductById(Number(id));
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleBuyNow = () => {
    addItem(product);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang chủ
          </Link>
        </nav>

        {/* Product Detail */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.isHot && (
                  <Badge className="rounded-lg bg-destructive px-3 py-1.5 text-destructive-foreground">
                    <Zap className="mr-1 h-3 w-3" />
                    HOT
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="rounded-lg bg-primary px-3 py-1.5 text-primary-foreground">
                    -{discount}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Shield, text: "Bảo hành" },
                { icon: Truck, text: "Giao ngay" },
                { icon: RefreshCw, text: "Đổi trả" },
                { icon: Headphones, text: "Hỗ trợ 24/7" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card p-3"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            <Badge variant="secondary" className="w-fit mb-3">
              {product.category}
            </Badge>

            {/* Name */}
            <h1 className="text-xl font-bold text-foreground sm:text-3xl text-balance">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (128 danh gia) | Da ban 1.2k+
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-baseline gap-2 gap-y-1 sm:gap-3">
              <span className="text-2xl font-bold text-primary sm:text-3xl">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                  <Badge variant="destructive" className="rounded-lg">Tiết kiệm {discount}%</Badge>
                </>
              )}
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Mô tả sản phẩm</h3>
              <p className="leading-relaxed text-muted-foreground">
                {product.description ||
                  "Sản phẩm chính hãng, chất lượng cao. Bảo hành và hỗ trợ kỹ thuật 24/7."}
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-foreground">Tính năng nổi bật</h3>
              <ul className="space-y-2">
                {[
                  "Sản phẩm chính hãng 100%",
                  "Giao hàng tự động qua email",
                  "Bảo hành theo thời gian sản phẩm",
                  "Hỗ trợ kỹ thuật miễn phí",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-6" />

            {/* Stock Status */}
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-3">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Còn hàng - Giao ngay sau thanh toán
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Mua ngay
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 rounded-xl border-primary/30 font-medium text-primary hover:bg-primary/10"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
            </div>

            {/* Support */}
            <Card className="mt-6 rounded-2xl border-border bg-secondary/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Cần hỗ trợ? Liên hệ Zalo/Telegram:{" "}
                  <span className="font-semibold text-primary">0123.456.789</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hướng dẫn sử dụng - trên phần sản phẩm liên quan */}
        {product.instructions && product.instructions.length > 0 && (
          <section className="mt-16">
            <Card className="overflow-hidden rounded-2xl border-border bg-card">
              <CardContent className="p-5 sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Hướng dẫn sử dụng
                </h3>
                <article className="text-sm text-muted-foreground">
                  <p className="leading-relaxed">
                    {product.instructions.join(". ")}
                  </p>
                </article>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-foreground">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
