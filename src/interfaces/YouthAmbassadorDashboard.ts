// Ambassador Data Type
export interface AmbassadorData {
  name: string;
  email: string;
  avatar: string;
  referralCode: string;
  referralLink: string;
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
}

// Referral History Item Type
export interface Referral {
  id: number;
  name: string;
  type: string;
  status: string;
  earnings: number;
  date: string;
}

export interface Withdrawal {
  id: number;
  amount: number;
  method: string; 
  status: string;
  date: string;
}