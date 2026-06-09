import { PartnerData, ListedBua, BuaHireRequestData, ReferralHistoryItem, WithdrawalHistoryItem } from './types';

export const mockPartnerData: PartnerData = {
  name: 'রাহুল আহমেদ',
  email: 'rahul@example.com',
  avatar: '',
  referralCode: 'AGENT2024',
  referralLink: 'https://taskwala.com/ref/AGENT2024',
  tier: 'Gold',
  joinDate: '১৫ মার্চ, ২০২৪',
  totalEarnings: 45420,
  pendingEarnings: 8850,
  withdrawableBalance: 36570,
  totalReferrals: 48,
  activeReferrals: 35,
  pendingReferrals: 8,
  thisMonthEarnings: 12250,
  thisMonthReferrals: 12,
  conversionRate: 72.9,
  nextTierProgress: 65,
  nextTier: 'Platinum',
  referralsToNextTier: 17,
  sharePercentage: 50,
  listedBuas: 12,
  listedProviders: 8,
  listedHouseOwners: 5
};

export const mockListedBuas: ListedBua[] = [
  { id: "bua-1", name: 'ফাতেমা বেগম', location: 'ধানমন্ডি', status: 'approved', earnings: 2500, phone: '01712345678' },
  { id: "bua-2", name: 'রহিমা খাতুন', location: 'গুলশান', status: 'pending', earnings: 0, phone: '01812345678' },
  { id: "bua-3", name: 'আয়েশা সিদ্দিকা', location: 'মিরপুর', status: 'approved', earnings: 3200, phone: '01912345678' },
  { id: "bua-4", name: 'জাহানারা বেগম', location: 'বনানী', status: 'approved', earnings: 1800, phone: '01612345678' },
];

export const mockBuaHireRequests: BuaHireRequestData[] = [
  { 
    id: "req-1", 
    userName: 'মোঃ করিম সাহেব', 
    userPhone: '01700000001',
    location: 'ধানমন্ডি ২৭',
    requestDate: '২৫ জানুয়ারি, ২০২৬',
    duration: 'মাসিক',
    requirements: 'রান্না ও পরিষ্কার-পরিচ্ছন্নতা',
    status: 'pending',
    assignedBua: null,
    planType: 'monthly',
    familyType: 'family',
    numPeople: 4,
    cookingTimes: 2,
    cookingPeriod: 'morning-noon',
    services: ['রান্না', 'কাপড় ধোয়া'],
    startDate: '2026-02-01',
    salaryPaymentDate: 5,
    wantTrial: true,
    trialDate: '2026-01-30',
    trialTimeSlot: 'morning',
    totalMonthlyPrice: 5380,
    address: 'বাসা ১০, রোড ২৭, ধানমন্ডি, ঢাকা'
  },
  { 
    id: "req-2", 
    userName: 'সাবরিনা আক্তার', 
    userPhone: '01700000002',
    location: 'গুলশান ২',
    requestDate: '২৪ জানুয়ারি, ২০২৬',
    duration: 'মাসিক',
    requirements: 'শিশু যত্ন ও ঘর গোছানো',
    status: 'pending',
    assignedBua: null,
    planType: 'monthly',
    familyType: 'family',
    numPeople: 3,
    cookingTimes: 3,
    services: ['রান্না', 'শিশু যত্ন', 'ঘর গোছানো'],
    startDate: '2026-02-05',
    totalMonthlyPrice: 7500,
    address: 'বাসা ৫, রোড ১১০, গুলশান ২, ঢাকা'
  },
  { 
    id: "req-3", 
    userName: 'আমিনুল ইসলাম', 
    userPhone: '01700000003',
    location: 'মিরপুর ১০',
    requestDate: '২৩ জানুয়ারি, ২০২৬',
    duration: 'মাসিক',
    requirements: 'সব ধরনের কাজ',
    status: 'assigned',
    assignedBua: 'ফাতেমা বেগম',
    planType: 'monthly',
    familyType: 'bachelor',
    numPeople: 2,
    cookingTimes: 2,
    services: ['রান্না', 'পরিষ্কার-পরিচ্ছন্নতা'],
    totalMonthlyPrice: 4200,
    address: 'ফ্ল্যাট ৪/এ, মিরপুর ১০, ঢাকা'
  },
];

export const mockReferralHistory: ReferralHistoryItem[] = [
  { id: 1, name: 'আব্দুল করিম', type: 'provider', status: 'active', earnings: 1500, date: '২০ ডিসেম্বর' },
  { id: 2, name: 'ফাতিমা বেগম', type: 'bua', status: 'active', earnings: 2500, date: '১৮ ডিসেম্বর' },
  { id: 3, name: 'মোঃ সাইফুল', type: 'house_owner', status: 'pending', earnings: 0, date: '১৫ ডিসেম্বর' },
];

export const mockWithdrawalHistory: WithdrawalHistoryItem[] = [
  { id: 1, amount: 15000, method: 'বিকাশ', status: 'completed', date: '১০ ডিসেম্বর' },
  { id: 2, amount: 10000, method: 'নগদ', status: 'completed', date: '২৫ নভেম্বর' },
  { id: 3, amount: 8500, method: 'ব্যাংক', status: 'processing', date: '২০ ডিসেম্বর' },
];


export const mockBuaDetails = {
  id: "bua-1",
  name: "ফাতেমা বেগম",
  phone: "01812345678",
  address: "মিরপুর-১১, ব্লক-সি, ঢাকা",
  nidNumber: "1234567890123",
  profilePhoto: "",
  status: "approved",
  joinDate: "2024-01-01",
  rating: 4.9,
  totalEarnings: 48000,

  areasWorked: [
    { name: "মিরপুর-১০", housesCount: 3 },
    { name: "মিরপুর-১১", housesCount: 2 },
    { name: "পল্লবী", housesCount: 1 },
  ],

  housesWorked: [
    {
      id: "house-1",
      userName: "রহিম আলী",
      address: "মিরপুর-১০, ঢাকা",
      services: ["রান্না", "ঘর পরিষ্কার"],
      duration: "৩ মাস",
      status: "active",
      monthlyPrice: 8000,
    },
    {
      id: "house-2",
      userName: "করিম সাহেব",
      address: "মিরপুর-১১, ঢাকা",
      services: ["রান্না", "কাপড় ধোয়া"],
      duration: "২ মাস",
      status: "completed",
      monthlyPrice: 7000,
    },
    {
      id: "house-3",
      userName: "নাজমা বেগম",
      address: "পল্লবী, ঢাকা",
      services: ["রান্না"],
      duration: "১ মাস",
      status: "completed",
      monthlyPrice: 5000,
    },
  ],

  attendanceHistory: [
    { month: "জানুয়ারি", year: 2024, totalDays: 31, workedDays: 29, absentDays: 2 },
    { month: "ফেব্রুয়ারি", year: 2024, totalDays: 29, workedDays: 27, absentDays: 2 },
    { month: "মার্চ", year: 2024, totalDays: 31, workedDays: 30, absentDays: 1 },
  ],

  skills: ["রান্না", "ঘর পরিষ্কার", "কাপড় ধোয়া", "বাচ্চা দেখাশোনা"],
};

export const mockContracts = [
  {
    id: "contract-1",
    user: {
      name: "রহিম আলী",
      phone: "01712345678",
      address: "মিরপুর-১০, ঢাকা",
      avatar: "",
    },
    bua: {
      id: "bua-1",
      name: "ফাতেমা বেগম",
      phone: "01812345678",
      photo: "",
    },
    services: ["রান্না", "ঘর পরিষ্কার"],
    cookingTimes: 2,
    numPeople: 4,
    startDate: "2024-01-15",
    monthlyPrice: 8000,
    status: "active",
    lastPaymentStatus: "paid",
    complaints: 0,
  },
  {
    id: "contract-2",
    user: {
      name: "করিম সাহেব",
      phone: "01612345678",
      address: "গুলশান-২, ঢাকা",
      avatar: "",
    },
    bua: {
      id: "bua-2",
      name: "রহিমা খাতুন",
      phone: "01912345678",
      photo: "",
    },
    services: ["রান্না", "কাপড় ধোয়া", "ঘর পরিষ্কার"],
    cookingTimes: 3,
    numPeople: 6,
    startDate: "2024-02-01",
    monthlyPrice: 12000,
    status: "active",
    lastPaymentStatus: "pending",
    complaints: 1,
  },
];

export const mockContractDetail = {
  id: 'contract-1',
  user: {
    name: 'রহিম আলী',
    phone: '01712345678',
    address: 'বাড়ি #১২, রোড #৫, মিরপুর-১০, ঢাকা-১২১৬',
    avatar: '',
    requirements: 'প্রতিদিন সকাল ৮টায় আসতে হবে। রান্না পরিষ্কার-পরিচ্ছন্ন হতে হবে। বাচ্চাদের খাবার আলাদাভাবে তৈরি করতে হবে।',
  },
  bua: {
    id: 'bua-1',
    name: 'ফাতেমা বেগম',
    phone: '01812345678',
    address: 'মিরপুর-১১, ঢাকা',
    nidNumber: '1234567890123',
    photo: '',
    rating: 4.9,
  },
  services: ['রান্না', 'ঘর পরিষ্কার'],
  cookingTimes: 2,
  numPeople: 4,
  startDate: '2024-01-15',
  monthlyPrice: 8000,
  status: 'active',
  complaints: [
    {
      id: 1,
      date: '2024-02-10',
      description: 'সময়মতো আসেনি',
      status: 'resolved',
    },
  ],
  paymentHistory: [
    { month: 'জানুয়ারি', year: 2024, status: 'paid', amount: 8000, paidDate: '2024-02-05' },
    { month: 'ফেব্রুয়ারি', year: 2024, status: 'paid', amount: 8000, paidDate: '2024-03-05' },
    { month: 'মার্চ', year: 2024, status: 'pending', amount: 8000 },
  ],
  absentDays: [
    { date: '2024-02-15', reason: 'অসুস্থতা' },
    { date: '2024-03-01', reason: 'জরুরি কাজ' },
  ],
  replacementHistory: [
    {
      id: 'replacement-1',
      buaName: 'আমেনা খাতুন',
      buaPhone: '01612345679',
      fromDate: '2024-02-15',
      toDate: '2024-02-16',
      daysWorked: 2,
      reason: 'মূল বুয়া অসুস্থ',
    },
  ],
};
