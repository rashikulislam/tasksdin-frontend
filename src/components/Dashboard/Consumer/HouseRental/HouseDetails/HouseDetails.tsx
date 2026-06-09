"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { House, PaymentDetails } from "../data/mockHouseData";
import HouseDetailsHeader from "./HouseDetailsHeader";
import HouseImageGallery from "./HouseImageGallery";
import HouseInfoSection from "./HouseInfoSection";
import HouseNavigationSection from "./HouseNavigationSection";
import HouseFacilitiesSection from "./HouseFacilitiesSection";
import HouseProviderInfo from "./HouseProviderInfo";
import HouseBookingModal from "./HouseBookingModal";
import HousePaymentModal from "../DashboardContent/HousePaymentModal";
import { useRouter } from "next/navigation";

interface HouseDetailsProps {
  id?: string;
  house: House;
  userLocation?: { lat: number; lng: number } | null;
  onBookingComplete?: (
    paymentDetails: PaymentDetails,
    moveInDate: Date,
  ) => void;
}

const HouseDetails = ({
  house,
  userLocation,
  onBookingComplete,
}: HouseDetailsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingMessage, setBookingMessage] = useState("");
  const router = useRouter();

  const handleBookNow = () => {
    if (!bookingDate) {
      toast({
        title: "তারিখ নির্বাচন করুন",
        description: "অনুগ্রহ করে প্রবেশের তারিখ নির্বাচন করুন",
        variant: "destructive",
      });
      return;
    }

    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentDetails: PaymentDetails) => {
    onBookingComplete?.(paymentDetails, bookingDate!);

    toast({
      title: "বুকিং সফল!",
      description: "আপনার বুকিং নিশ্চিত করা হয়েছে।",
    });

    setShowPaymentModal(false);
    setBookingDate(undefined);
    setBookingMessage("");
  };

  const availableFromDate =
    house.availableFrom && !isNaN(new Date(house.availableFrom).getTime())
      ? format(new Date(house.availableFrom), "dd MMM, yyyy")
      : "শীঘ্রই";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <HouseDetailsHeader
        onBack={() => router.back()}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite((prev) => !prev)}
        houseTitle={house.title}
      />

      {/* Image Gallery */}
      <HouseImageGallery
        images={house.images}
        title={house.title}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />

      {/* Content */}
      <div className="container-mobile space-y-6 py-6 pb-32">
        <HouseInfoSection house={house} />

        <HouseNavigationSection
          house={house}
          userLocation={userLocation}
        />

        <HouseFacilitiesSection
          facilities={house.facilities}
          rules={house.rules}
          description={house.description}
        />

        <HouseProviderInfo
          providerName={house.providerName}
          providerPhone={house.providerPhone}
          providerPhoto={house.providerPhoto}
        />
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4 backdrop-blur-sm">
        <div className="container-mobile flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">উপলব্ধ তারিখ</p>
            <p className="font-semibold">{availableFromDate}</p>
          </div>

          <Button
            size="lg"
            className="px-8"
            onClick={() => setShowBookingModal(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            এখনই বুক করুন
          </Button>
        </div>
      </div>

      {/* Modals */}
      <HouseBookingModal
        open={showBookingModal}
        onOpenChange={setShowBookingModal}
        rent={house.rent}
        bookingDate={bookingDate}
        onBookingDateChange={setBookingDate}
        bookingMessage={bookingMessage}
        onBookingMessageChange={setBookingMessage}
        onSubmit={handleBookNow}
      />

      <HousePaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        house={house}
        moveInDate={bookingDate}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default HouseDetails;
