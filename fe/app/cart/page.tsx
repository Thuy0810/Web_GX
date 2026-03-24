"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ShoppingBag,
  Shield,
  Zap,
  CreditCard,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  const totalPrice = getTotalPrice();
  const shippingFee = 0; // Digital products - no shipping
  const finalTotal = totalPrice + shippingFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto w-full max-w-[1600px] px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-8 rounded-2xl bg-primary/10 p-8">
              <ShoppingBag className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground">
              Giỏ hàng trống
            </h1>
            <p className="mb-8 max-w-md text-muted-foreground leading-relaxed">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm
              chất lượng của chúng tôi.
            </p>
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Tiếp tục mua sắm
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary px-3 py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Tiếp tục mua sắm
          </Link>
        </nav>

        <h1 className="mb-10 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Giỏ hàng của bạn ({items.length} sản phẩm)
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.id}`}
                      className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {item.category}
                          </p>
                          <Link
                            href={`/product/${item.id}`}
                            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Xóa sản phẩm</span>
                        </Button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                          </p>
                          {item.originalPrice && (
                            <p className="text-xs text-muted-foreground line-through">
                              {(item.originalPrice * item.quantity).toLocaleString(
                                "vi-VN"
                              )}đ
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa tất cả
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Tổng đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập mã giảm giá"
                    className="rounded-xl border-border bg-secondary"
                  />
                  <Button variant="outline" className="rounded-xl">Áp dụng</Button>
                </div>

                <Separator />

                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span className="font-medium text-foreground">{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span className="font-medium text-primary">Miễn phí</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">
                    {finalTotal.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 pt-4">
                  <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs font-medium text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Bảo mật
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs font-medium text-muted-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    Giao ngay
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90" size="lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Thanh toán
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Bằng việc đặt hàng, bạn đồng ý với{" "}
                  <Link href="#" className="font-medium text-primary hover:underline">
                    Điều khoản dịch vụ
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
