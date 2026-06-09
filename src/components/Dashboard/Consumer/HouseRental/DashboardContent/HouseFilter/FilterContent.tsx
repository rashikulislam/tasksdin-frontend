"use client";

import AreaFilter from "./AreaFilter";
import BedroomCount from "./BedroomCount";
import HouseTypeFilter from "./HouseTypeFilter";
import ImportantPlaceFilter from "./ImportantPlaceFilter";
import PriceRange from "./PriceRange";

const FilterContent = () => {
  return (
    <div className="space-y-6 py-4 mt-10">
      {/* Important Places Filter */}
      <ImportantPlaceFilter />

      {/* Area */}

      <AreaFilter />

      {/* House Type */}
      <HouseTypeFilter />

      {/* Price Range */}
      <PriceRange />

      {/* Bedrooms */}
      <BedroomCount />
    </div>
  );
};

export default FilterContent;
