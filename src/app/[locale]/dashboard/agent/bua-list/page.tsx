"use client";
import BuaListingForm from "@/components/Pages/YouthAmbassador/Dashboard/BuaListingForm";
import BuaListingTab from "@/components/Pages/YouthAmbassador/Dashboard/BuaListingTab";

import { useState } from "react";

function BuaList() {
  const [showBuaListingForm, setShowBuaListingForm] = useState(false);

  return (
    <div>
      <BuaListingTab setShowBuaListingForm={setShowBuaListingForm} />
      {showBuaListingForm && (
        <BuaListingForm
          isOpen={showBuaListingForm}
          onClose={() => setShowBuaListingForm(false)}
        />
      )}
    </div>
  );
}

export default BuaList;
