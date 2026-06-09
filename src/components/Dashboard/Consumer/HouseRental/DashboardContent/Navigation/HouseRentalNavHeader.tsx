"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Home, Heart, Calendar, Locate, MapPin, Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useHouseRental } from "@/components/Dashboard/Consumer/HouseRental/contexts/HouseRentalContext";

export default function HouseRentalNavHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { userLocation, isLoadingLocation, getUserLocation } = useHouseRental();

  const navItems = [
    {
      path: "/house-rental",
      label: "বাসা খুঁজুন",
      icon: Home,
    },
    {
      path: "/house-rental/bookings",
      label: "আমার বুকিং",
      icon: Calendar,
    },
    {
      path: "/house-rental/favorites",
      label: "পছন্দের তালিকা",
      icon: Heart,
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container-mobile py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/house-rental" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">বাসা ভাড়া</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                আপনার স্বপ্নের বাসা খুঁজুন
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link href={item.path} className="gap-2 flex items-center">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={getUserLocation}
              disabled={isLoadingLocation}
              className="gap-2"
            >
              {isLoadingLocation ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : userLocation ? (
                <MapPin className="w-4 h-4 text-green-500" />
              ) : (
                <Locate className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {userLocation ? "লোকেশন পাওয়া গেছে" : "লোকেশন নিন"}
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-4 mt-8">
                  <h3 className="font-semibold text-lg">মেনু</h3>

                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href={item.path}>
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
