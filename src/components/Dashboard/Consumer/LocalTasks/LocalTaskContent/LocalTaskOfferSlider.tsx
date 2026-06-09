"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Zap,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Gift,
  Percent,
} from "lucide-react";

interface OfferFeature {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

interface Offer {
  id: number;
  type: "discount" | "new_user" | "premium";
  badge: string;
  buttonText: string;
  title: string;
  description: string;
  color: "primary" | "accent" | "warning";
  features: OfferFeature[];
}

const LocalTaskOfferSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Offers data
  const offers: Offer[] = [
    {
      id: 1,
      type: "discount",
      badge: "বিশেষ অফার",
      buttonText: "অফার দাবি করুন",
      title: "লোকাল সার্ভিসে ছাড়",
      description: "আজই স্থানীয় সেবায় ২৫% পর্যন্ত ছাড় পান!",
      color: "primary",
      features: [
        { icon: Percent, title: "ছাড়ের হার", subtitle: "২৫% পর্যন্ত" },
        { icon: Clock, title: "সীমিত সময়", subtitle: "শুধু আজকের জন্য" },
        { icon: MapPin, title: "লোকাল এলাকা", subtitle: "৫ কিমি এর মধ্যে" },
      ],
    },
    {
      id: 2,
      type: "new_user",
      badge: "নতুন ইউজার অফার",
      buttonText: "বোনাস নিন",
      title: "স্বাগতম বোনাস",
      description: "প্রথম অর্ডারে ৫০০ টাকা বোনাস + ফ্রি ডেলিভারি!",
      color: "accent",
      features: [
        { icon: Gift, title: "বোনাসের পরিমাণ", subtitle: "৫০০ টাকা" },
        { icon: Star, title: "প্রথম অর্ডার", subtitle: "ফ্রি ডেলিভারি" },
        {
          icon: Users,
          title: "প্রায়োরিটি সাপোর্ট",
          subtitle: "ডেডিকেটেড সাহায্য",
        },
      ],
    },
    {
      id: 3,
      type: "premium",
      badge: "প্রিমিয়াম সার্ভিস",
      buttonText: "প্রিমিয়াম বুক করুন",
      title: "প্রিমিয়াম লোকাল সার্ভিস",
      description: "যাচাইকৃত প্রোভাইডার, একই দিনে সার্ভিস, প্রায়োরিটি বুকিং!",
      color: "warning",
      features: [
        {
          icon: Star,
          title: "যাচাইকৃত প্রোভাইডার",
          subtitle: "ব্যাকগ্রাউন্ড চেক করা",
        },
        {
          icon: TrendingUp,
          title: "একই দিনে সার্ভিস",
          subtitle: "গ্যারান্টিযুক্ত",
        },
        {
          icon: Clock,
          title: "প্রায়োরিটি বুকিং",
          subtitle: "লাইন এড়িয়ে যান",
        },
      ],
    },
  ];

  // Auto-slide with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [offers.length]);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  }, [offers.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  }, [offers.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Dynamic color classes
  const getColorClasses = (color: Offer["color"]) => {
    const classes = {
      primary: {
        gradient: "from-primary/10 to-primary/5",
        border: "border-primary/20",
        badge: "bg-primary/20 text-primary border-primary/30",
        button: "bg-primary hover:bg-primary/90 text-primary-foreground",
        icon: "text-primary",
      },
      accent: {
        gradient: "from-accent/10 to-accent/5",
        border: "border-accent/20",
        badge: "bg-accent/20 text-accent border-accent/30",
        button: "bg-accent hover:bg-accent/90 text-accent-foreground",
        icon: "text-accent",
      },
      warning: {
        gradient: "from-warning/10 to-warning/5",
        border: "border-warning/20",
        badge: "bg-warning/20 text-warning border-warning/30",
        button: "bg-warning hover:bg-warning/90 text-warning-foreground",
        icon: "text-warning",
      },
    };
    return classes[color] || classes.primary;
  };

  return (
    <div className="relative overflow-hidden rounded-xl -z-50 pt-6 lg:pt-12">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {offers.map((offer) => {
          const colors = getColorClasses(offer.color);
          return (
            <div key={offer.id} className="w-full flex-shrink-0 px-2">
              <Card
                className={`bg-gradient-to-r ${colors.gradient} ${colors.border} overflow-hidden`}
              >
                <CardContent className="p-6">
                  {/* Badge + Button */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      variant="secondary"
                      className={`${colors.badge} gap-1`}
                    >
                      <Zap className="h-3 w-3" />
                      {offer.badge}
                    </Badge>
                    <Button size="sm" className={colors.button}>
                      {offer.buttonText}
                    </Button>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {offer.description}
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex justify-center mb-2">
                            <feature.icon
                              className={`h-8 w-8 ${colors.icon}`}
                            />
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            {feature.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {feature.subtitle}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={prevSlide}
        aria-label="পূর্ববর্তী স্লাইড"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={nextSlide}
        aria-label="পরবর্তী স্লাইড"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-6 space-x-2 z-20 relative">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            aria-label={`স্লাইড ${index + 1} এ যান`}
          />
        ))}
      </div>
    </div>
  );
};

export default LocalTaskOfferSlider;
