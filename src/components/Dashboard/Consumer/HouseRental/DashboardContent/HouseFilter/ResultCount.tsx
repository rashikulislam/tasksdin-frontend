import React from "react";
import { useHouseRental } from "../../contexts/HouseRentalContext";

function ResultCount() {
  const { filters, sortedHouses } = useHouseRental();

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">
          {sortedHouses.length}
        </span>{" "}
        টি বাসা পাওয়া গেছে
        {filters?.importantPlace && (
          <span className="text-primary">
            {" "}
            {filters?.importantPlace.name} এর কাছে
          </span>
        )}
      </p>
    </div>
  );
}

export default ResultCount;
