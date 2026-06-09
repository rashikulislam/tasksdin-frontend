export interface PartnerData {
  name: string;
  email: string;
  avatar: string;
  referralCode: string;
  referralLink: string;
  tier: string;
  joinDate: string;
  totalEarnings: number;
  pendingEarnings: number;
  withdrawableBalance: number;
  totalReferrals: number;
  activeReferrals: number;
  pendingReferrals: number;
  thisMonthEarnings: number;
  thisMonthReferrals: number;
  conversionRate: number;
  nextTierProgress: number;
  nextTier: string;
  referralsToNextTier: number;
  sharePercentage: number;
  listedBuas: number;
  listedProviders: number;
  listedHouseOwners: number;
}

export interface ListedBua {
  id: string;
  name: string;
  location: string;
  status: 'approved' | 'pending';
  earnings: number;
  phone: string;
  profilePhoto?: string;
  nidNumber?: string;
}

export interface BuaHireRequestData {
  id: string;
  userName: string;
  userPhone: string;
  location: string;
  requestDate: string;
  duration: string;
  requirements: string;
  status: 'pending' | 'assigned';
  assignedBua: string | null;
  // Detailed form data from BuaHire
  planType?: 'monthly' | 'livein';
  familyType?: 'bachelor' | 'family';
  numPeople?: number;
  cookingTimes?: number;
  cookingPeriod?: string;
  services?: string[];
  startDate?: string;
  salaryPaymentDate?: number;
  wantTrial?: boolean;
  trialDate?: string;
  trialTimeSlot?: 'morning' | 'afternoon' | 'night';
  totalMonthlyPrice?: number;
  address?: string;
}

export interface ReferralHistoryItem {
  id: number;
  name: string;
  type: 'bua' | 'provider' | 'house_owner';
  status: string;
  earnings: number;
  date: string;
}

export interface WithdrawalHistoryItem {
  id: number;
  amount: number;
  method: string;
  status: 'completed' | 'processing';
  date: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}
