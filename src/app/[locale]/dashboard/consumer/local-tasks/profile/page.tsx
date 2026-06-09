'use client';
import ProfileManagement from "@/components/Dashboard/Consumer/LocalTasks/ProfileManagement/Profile";
import { UserProfile } from "@/interfaces";

const mockProfile: UserProfile = {
  name: "রহিম আহমেদ",
  email: "rahim@example.com",
  phone: "01700000000",
  location: "ঢাকা, বাংলাদেশ",
  bio: "আমি একজন দক্ষ ফ্রিল্যান্সার। গ্রাফিক ডিজাইন ও ওয়েব ডেভেলপমেন্টে বিশেষজ্ঞ।",
  joinDate: "১৫ মার্চ, ২০২৪",
  completedOrders: 47,
  rating: 4.8,
  verified: true,
};

export default function ProfilePage() {
  const handleUpdate = (updated: UserProfile) => {
    console.log("Profile updated:", updated);
    // API call here
  };

  const handleDelete = () => {
    if (confirm("আপনি কি প্রোফাইল মুছে ফেলতে চান?")) {
      console.log("Profile deleted");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl pt-[65px]">
      <ProfileManagement 
        profile={mockProfile}
        onUpdateProfile={handleUpdate}
        onDeleteProfile={handleDelete}
      />
    </div>
  );
}