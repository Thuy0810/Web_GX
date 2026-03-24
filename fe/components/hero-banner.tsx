"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Headphones, CreditCard } from "lucide-react";

const slides = [
  {
    title: "Tài khoản Premium",
    subtitle: "Chính hãng - Giá rẻ nhất",
    description: "Netflix, Spotify, YouTube Premium, ChatGPT Plus và hàng nghìn sản phẩm số khác",
    cta: "Khám phá ngay",
  },
  {
    title: "Phần mềm bản quyền",
    subtitle: "Adobe, Microsoft, Autodesk",
    description: "Tiết kiệm đến 70% so với giá gốc. Hỗ trợ cài đặt 24/7",
    cta: "Xem ngay",
  },
  {
    title: "License & Key",
    subtitle: "Windows, Office, Antivirus",
    description: "Key chính hãng, kích hoạt vĩnh viễn. Bảo hành trọn đời",
    cta: "Mua ngay",
  },
];

const features = [
  {
    icon: Shield,
    title: "Bảo hành",
    description: "Đổi trả trong 24h",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Luôn sẵn sàng hỗ trợ",
  },
  {
    icon: CreditCard,
    title: "Thanh toán",
    description: "An toàn & đa dạng",
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Main Banner */}
      <div className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-primary/[0.06] via-background via-50% to-accent/15">
        {/* Tech dot grid pattern */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_1px_1px,oklch(0.55_0.18_230_/_0.15)_1px,transparent_0)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]" />
        {/* Horizontal grid lines - tech feel */}
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_0%,oklch(0.55_0.18_230_/_0.03)_1px,transparent_1px)] bg-[size:100%_48px] [mask-image:radial-gradient(ellipse_100%_70%_at_50%_0%,black,transparent_70%)]" />
        <div className="relative z-[2] flex min-h-[70vh] w-full flex-col px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[70vh] w-full flex-1 flex-col justify-center py-20 sm:py-28 lg:py-36">
            {/* Glow orbs - stronger tech */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-primary/30 blur-[150px]" />
              <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-accent/25 blur-[160px]" />
              <div className="absolute left-1/2 -top-32 h-80 w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
            </div>

            {/* Content slides */}
            <div className="relative">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "pointer-events-none absolute inset-0 opacity-0 translate-y-4"
                  }`}
                >
                  <div className="text-center">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      {slide.subtitle}
                    </p>
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl text-balance w-full [text-wrap:balance]">
                      {slide.title}
                    </h1>
                    <p className="mx-auto mb-10 w-full max-w-2xl px-2 text-base text-muted-foreground text-pretty sm:px-0 sm:text-lg leading-relaxed">
                      {slide.description}
                    </p>
                    <Button
                      size="lg"
                      className="h-12 rounded-xl border border-primary/50 bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_30px_-5px_var(--primary)] transition-all hover:bg-primary/90 hover:shadow-[0_0_40px_-5px_var(--primary)] hover:-translate-y-0.5"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Navigation - full width, buttons at viewport edges */}
              <div className="absolute left-0 right-0 top-1/2 z-10 flex w-full -translate-y-1/2 justify-between px-4 sm:px-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="h-12 w-12 rounded-xl border border-primary/20 bg-background/70 text-foreground shadow-lg backdrop-blur-xl hover:bg-primary/10 hover:text-primary hover:border-primary/40 hover:shadow-[0_0_20px_-5px_var(--primary)]"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Trước</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextSlide}
                  className="h-12 w-12 rounded-xl border border-primary/20 bg-background/70 text-foreground shadow-lg backdrop-blur-xl hover:bg-primary/10 hover:text-primary hover:border-primary/40 hover:shadow-[0_0_20px_-5px_var(--primary)]"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Sau</span>
                </Button>
              </div>

              {/* Dots */}
              <div className="mt-10 flex justify-center gap-2.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "h-2.5 w-8 bg-primary"
                        : "h-2.5 w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  >
                    <span className="sr-only">Slide {index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar - full width */}
      <div className="w-full border-b border-primary/10 bg-card/30 backdrop-blur-2xl">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-primary/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center justify-center gap-3 py-5 sm:py-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary shadow-[0_0_20px_-8px_var(--primary)]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-card-foreground">
                    {feature.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
