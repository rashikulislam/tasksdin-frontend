"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Shield,
  Clock,
  Star,
  Heart,
  Sparkles,
  Phone,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

export default function BuaHirePage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const features = [
    {
      icon: Shield,
      title: "নিরাপদ ও যাচাইকৃত",
      desc: "সকল বুয়া NID দিয়ে যাচাইকৃত",
    },
    {
      icon: UserCheck,
      title: "অভিজ্ঞ কর্মী",
      desc: "প্রশিক্ষিত ও অভিজ্ঞ বুয়া",
    },
    { icon: Clock, title: "সময়মতো সেবা", desc: "নির্ধারিত সময়ে কাজ সম্পন্ন" },
    {
      icon: Heart,
      title: "পরিচ্ছন্ন পরিবেশ",
      desc: "স্বাস্থ্যকর রান্না ও পরিষ্কার-পরিচ্ছন্নতা",
    },
  ];

  const services = [
    { title: "রান্না", desc: "সকাল, দুপুর, রাতের খাবার", icon: "🍳" },
    { title: "কাপড় ধোয়া", desc: "হাতে ধোয়া ও ইস্ত্রি", icon: "👕" },
    { title: "টয়লেট পরিষ্কার", desc: "নিয়মিত পরিষ্কার", icon: "🚿" },
    { title: "শিশু যত্ন", desc: "বাচ্চাদের দেখাশোনা", icon: "👶" },
    { title: "বয়স্ক সেবা", desc: "বয়স্কদের যত্ন", icon: "👴" },
    { title: "লিভ-ইন সেবা", desc: "২৪ ঘণ্টা সেবা", icon: "🏠" },
  ];

  const testimonials = [
    {
      name: "রহিমা বেগম",
      rating: 5,
      text: "৩ মাস ধরে বুয়া নিয়েছি। খুবই সন্তুষ্ট। সময়মতো আসেন, রান্না খুব ভালো করেন।",
    },
    {
      name: "করিম সাহেব",
      rating: 5,
      text: "লিভ-ইন বুয়া নিয়েছি। বয়স্ক মা-বাবার যত্ন নেওয়ার জন্য। অসাধারণ সেবা।",
    },
    {
      name: "নাসরিন আক্তার",
      rating: 5,
      text: "মাসিক সার্ভিস নিই। ৬ জনের খাবার রান্না করেন। খুব পরিচ্ছন্ন।",
    },
  ];

  const pricingPlans = [
    { type: "১ বেলা রান্না", price: "২,৫০০", period: "/মাস", popular: false },
    { type: "২ বেলা রান্না", price: "৪,৬৮০", period: "/মাস", popular: true },
    { type: "৩ বেলা রান্না", price: "৬,৬৩০", period: "/মাস", popular: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className={`relative overflow-hidden ${isMobile ? "py-12 px-4" : "py-20 px-4"} bg-gradient-to-br from-primary/10 via-background to-accent/10`}
      >
        <div className="absolute inset-0 opacity-50" />
        <div
          className={`relative ${isMobile ? "container-mobile" : "container mx-auto"} text-center`}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            বিশ্বস্ত সেবা প্রদানকারী
          </Badge>
          <h1
            className={`font-bold mb-6 ${isMobile ? "text-3xl" : "text-4xl md:text-5xl lg:text-6xl"}`}
          >
            আপনার ঘরের জন্য
            <br />
            <span className="text-primary">বিশ্বস্ত বুয়া</span> খুঁজুন
          </h1>
          <p
            className={`text-muted-foreground mb-8 ${isMobile ? "text-lg" : "text-xl max-w-3xl mx-auto"}`}
          >
            রান্না, কাপড় ধোয়া, বাসা পরিষ্কার, শিশু যত্ন - সব কাজের জন্য
            যাচাইকৃত ও অভিজ্ঞ বুয়া পেয়ে যান মাত্র কয়েক ক্লিকে
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/dashboard/consumer/maid-service/maid-hire-form"}>
              <Button
                size="lg"
                className="shadow-lg"
                onClick={() => router.push("")}
              >
                <Home className="w-5 h-5 mr-2" />
                বুয়া হায়ার করুন
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Phone className="w-5 h-5 mr-2" />
              কল করুন
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl mb-4">আমাদের সেবাসমূহ</h2>
            <p className="text-muted-foreground">
              সব ধরনের ঘরোয়া কাজের জন্য আমরা আছি
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg">
                <CardContent className="p-6">
                  <span className="text-4xl mb-3 block">{service.icon}</span>
                  <h3 className="font-bold mb-1">{service.title}</h3>
                  <p className="text-muted-foreground text-xs">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="font-bold text-3xl mb-4">সাশ্রয়ী মূল্যে সেবা</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative ${plan.popular ? "border-primary border-2" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1">
                    জনপ্রিয়
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">{plan.type}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary">
                      ৳{plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <Link href={"/dashboard/consumer/bua-hire/booking"}>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      হায়ার করুন
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl mb-4">গ্রাহকদের মতামত</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center">
        <div className="container mx-auto">
          <h2 className="font-bold text-4xl mb-4">আজই বুয়া হায়ার করুন</h2>
          <p className="mb-8 opacity-90">
            ঘরের কাজের চিন্তা ছাড়ুন। আমাদের বিশ্বস্ত বুয়ারা আপনার ঘরের যত্ন
            নেবে।
          </p>
          <Link href={"/dashboard/consumer/bua-hire/booking"}>
            <Button size="lg" variant="secondary">
              <Home className="w-5 h-5 mr-2" />
              এখনই হায়ার করুন
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
