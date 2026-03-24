"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ChevronRight, Sparkles } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isHot?: boolean;
  inStock?: boolean;
}

interface CategorySectionProps {
  id: string;
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export function CategorySection({
  id,
  title,
  products,
  viewAllHref = "#",
}: CategorySectionProps) {
  return (
    <section id={id} className="group/section py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header - danh mục to hơn + hiệu ứng */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
          <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl lg:text-3xl xl:text-4xl">
            <span className="flex h-8 w-1 shrink-0 rounded-full bg-gradient-to-b from-primary via-accent to-primary shadow-[0_0_12px_var(--primary)] transition-all duration-300 group-hover/section:shadow-[0_0_24px_var(--primary)] group-hover/section:w-1.5 sm:h-10" />
            <span className="transition-colors duration-300 group-hover/section:text-primary">
              {title}
            </span>
            <Sparkles className="h-5 w-5 text-primary opacity-50 transition-all duration-300 group-hover/section:opacity-100 group-hover/section:scale-110 sm:h-6" />
          </h2>
          <Button
            variant="ghost"
            asChild
            className="group/btn rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_20px_-8px_var(--primary)]"
          >
            <Link href={viewAllHref} className="flex items-center gap-2">
              Xem thêm
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              category={product.category}
              isHot={product.isHot}
              inStock={product.inStock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
