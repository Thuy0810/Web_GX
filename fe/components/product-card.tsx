"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Zap, ShoppingBag, Percent } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isHot?: boolean;
  inStock?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  isHot = false,
  inStock = true,
}: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const product = { id, name, price, originalPrice, image, category, isHot, inStock };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem(product);
    router.push("/cart");
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[#EAEAEA] bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#e0e0e0] dark:border-white/10 dark:hover:border-white/20 active:scale-[0.99]">
      <Link href={`/product/${id}`} className="flex flex-1 flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          />
          {/* Gradient overlay - đồng bộ ảnh */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {/* Badges - gradient, chồng lên góc ảnh */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {isHot && (
              <span className="inline-flex w-fit items-center gap-1 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                <Zap className="h-3 w-3" />
                HOT
              </span>
            )}
            {discount > 0 && (
              <span className="inline-flex w-fit items-center gap-1 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                <Percent className="h-3 w-3" />
                -{discount}%
              </span>
            )}
          </div>
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm">
              <span className="rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground">
                Hết hàng
              </span>
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Category */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category}
          </p>

          {/* Product name */}
          <h3 className="mb-4 line-clamp-2 flex-1 text-base font-semibold leading-snug text-foreground">
            {name}
          </h3>

          {/* Price - nổi bật hơn */}
          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-[22px] font-bold text-primary">
              {price.toLocaleString("vi-VN")}đ
            </span>
            {originalPrice && (
              <span className="text-sm text-[#aaa] line-through dark:text-muted-foreground/70">
                {originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
        </CardContent>
      </Link>

      {/* CTA - nút chính gradient, Thêm giỏ là link phụ */}
      <CardFooter className="flex flex-col gap-2 border-t border-[#EAEAEA] bg-muted/5 p-4 dark:border-white/10">
        <Button
          size="sm"
          className="h-11 w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-95"
          disabled={!inStock}
          onClick={handleBuyNow}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Mua ngay
        </Button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Thêm vào giỏ
        </button>
      </CardFooter>
    </Card>
  );
}
