"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Building2, Loader2, MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  GooglePlacePrediction,
  ImportantPlace,
} from "../../data/mockHouseData";
import { Button } from "@/components/ui/button";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function ImortantPlaceModal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<GooglePlacePrediction[]>(
    [],
  );
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    setSelectedImportantPlace,
    filters,
    updateFilter,
    showPlaceModal,
    setShowPlaceModal,
  } = useHouseRental();

  // Simulated Google Places search (in production, use actual Google Places API)
  const searchPlaces = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulated delay for API call feel
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock results for demo - in production, this would call Google Places API
    const mockResults: GooglePlacePrediction[] = [
      {
        place_id: "place_1",
        description: `${query} - ঢাকা মেডিকেল কলেজ হাসপাতাল`,
        structured_formatting: {
          main_text: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
          secondary_text: "সেক্রেটারিয়েট রোড, ঢাকা",
        },
      },
      {
        place_id: "place_2",
        description: `${query} - বায়তুল মোকাররম জাতীয় মসজিদ`,
        structured_formatting: {
          main_text: "বায়তুল মোকাররম জাতীয় মসজিদ",
          secondary_text: "মতিঝিল, ঢাকা",
        },
      },
      {
        place_id: "place_3",
        description: `${query} - নিউ মার্কেট`,
        structured_formatting: {
          main_text: "নিউ মার্কেট",
          secondary_text: "ধানমন্ডি, ঢাকা",
        },
      },
      {
        place_id: "place_4",
        description: `${query} - গুলশান-১ সার্কেল`,
        structured_formatting: {
          main_text: "গুলশান-১ সার্কেল",
          secondary_text: "গুলশান, ঢাকা",
        },
      },
      {
        place_id: "place_5",
        description: `${query} - মিরপুর-১০ গোল চত্বর`,
        structured_formatting: {
          main_text: "মিরপুর-১০ গোল চত্বর",
          secondary_text: "মিরপুর, ঢাকা",
        },
      },
    ].filter(
      (p) =>
        p.structured_formatting.main_text
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        p.structured_formatting.secondary_text
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        query.length > 0,
    );

    setSearchResults(mockResults);
    setIsSearching(false);
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchPlaces(searchQuery);
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handlePlaceSelect = (prediction: GooglePlacePrediction) => {
    // Mock coordinates for demo - in production, use Google Places Details API
    const mockCoordinates: Record<string, { lat: number; lng: number }> = {
      place_1: { lat: 23.726, lng: 90.3975 },
      place_2: { lat: 23.7323, lng: 90.4095 },
      place_3: { lat: 23.734, lng: 90.387 },
      place_4: { lat: 23.7925, lng: 90.415 },
      place_5: { lat: 23.807, lng: 90.368 },
    };

    const coords = mockCoordinates[prediction.place_id] || {
      lat: 23.7808,
      lng: 90.405,
    };

    const place: ImportantPlace = {
      id: prediction.place_id,
      name: prediction.structured_formatting.main_text,
      type: "custom",
      icon: <Building2 className="w-5 h-5" />,
      coordinates: coords,
    };

    updateFilter("importantPlace", place);
    setSelectedImportantPlace({
      lat: coords.lat,
      lng: coords.lng,
      name: prediction.structured_formatting.main_text,
    });
    setShowPlaceModal(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Dialog open={showPlaceModal} onOpenChange={setShowPlaceModal}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            গুরুত্বপূর্ণ স্থান খুঁজুন
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="হাসপাতাল, স্কুল, মার্কেট, অফিস খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-muted-foreground" />
            )}
          </div>

          {/* Distance Slider */}
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <Label>সর্বোচ্চ দূরত্ব: {filters?.maxDistanceKm} কিমি</Label>
            <Slider
              value={[filters?.maxDistanceKm]}
              onValueChange={(values) =>
                updateFilter("maxDistanceKm", values[0])
              }
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>১ কিমি</span>
              <span>২০ কিমি</span>
            </div>
          </div>

          {/* Search Results */}
          {searchQuery.trim() && (
            <div className="space-y-2">
              <Label className="text-muted-foreground">সার্চ রেজাল্ট</Label>
              <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Button
                      key={result.place_id}
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() => handlePlaceSelect(result)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">
                            {result.structured_formatting.main_text}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {result.structured_formatting.secondary_text}
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>কোনো স্থান পাওয়া যায়নি</p>
                    <p className="text-xs">অন্য কিছু দিয়ে খুঁজুন</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Initial state - prompt to search */}
          {!searchQuery.trim() && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>গুরুত্বপূর্ণ স্থান খুঁজুন</p>
              <p className="text-xs">
                হাসপাতাল, স্কুল, মসজিদ, মার্কেট বা অফিসের নাম লিখুন
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImortantPlaceModal;
