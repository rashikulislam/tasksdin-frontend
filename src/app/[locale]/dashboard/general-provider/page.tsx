"use client";

import { VerificationModal } from "@/components/Modal/VerificationModal";
import useProviderVerified from "@/hooks/useProviderVerified";
import { useState } from "react";

const Dashboard = () => {
  // const { loading, data } = useProviderVerified();
  // const isVerified = data?.is_verified;
  // const [isModalOpen, setIsModalOpen] = useState(!isVerified);
  // if (loading) {
  //   return;
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Your dashboard content goes here */}
      <h1 className="py-20">dhewdwueifyewryh</h1>
      {/* Verification Modal */}
      {/* <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </div>
  );
};

export default Dashboard;
