"use client";

import ImortantPlaceModal from "./ImortantPlaceModal";
import ImportantPlaceBadge from "./ImportantPlaceBadge";
import QuickFilters from "./QuickFilters";
import ResultCount from "./ResultCount";
import SearchBar from "./SearchBar";

const HouseFilters = () => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <SearchBar />

      {/* Active Important Place Filter Badge */}
      <ImportantPlaceBadge />

      {/* Quick Filters */}
      <QuickFilters />

      {/* Results Count */}
      <ResultCount />

      {/* Important Places Modal - Google Maps Search */}
      <ImortantPlaceModal />
    </div>
  );
};

export default HouseFilters;
