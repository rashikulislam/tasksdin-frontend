export interface AssignedBua {
  id: string;
  name: string;
  phone: string;
  nidNumber: string;
  photoUrl: string;
}

export interface InstallmentPayment {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid';
}

export interface BuaHireRequest {
  id: string;
  createdAt: string;
  planType: 'monthly' | 'livein';
  familyType: 'bachelor' | 'family';
  numPeople: number;
  cookingTimes: number;
  cookingPeriod: string;
  services: string[];
  startDate: string;
  salaryPaymentDate: number;
  wantTrial: boolean;
  trialPaid: boolean;
  trialTimeSlot?: 'morning' | 'afternoon' | 'night';
  trialDate?: string;
  totalMonthlyPrice: number;
  status: 'pending' | 'approved' | 'assigned' | 'active' | 'completed';
  assignedBua?: AssignedBua;
  advancePayment: {
    total: number;
    installments: InstallmentPayment[];
  };
  userName: string;
  phoneNumber: string;
  address: string;
}

export interface MonthlyPayment {
  id: string;
  requestId: string;
  month: string;
  year: number;
  amount: number;
  paidDate?: string;
  status: 'pending' | 'paid';
}


export const mockAssignedBua: AssignedBua = {
  id: 'bua-1',
  name: 'সালমা বেগম',
  phone: '01712345678',
  nidNumber: '1990123456789',
  photoUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=salma&backgroundColor=b6e3f4',
};

export const mockRequests: BuaHireRequest[] = [
  {
    id: 'req-1',
    createdAt: '2026-01-05T10:00:00Z',
    planType: 'monthly',
    familyType: 'family',
    numPeople: 4,
    cookingTimes: 2,
    cookingPeriod: 'morning-noon',
    services: ['রান্না', 'কাপড় ধোয়া'],
    startDate: '2026-01-15',
    salaryPaymentDate: 5,
    wantTrial: false,
    trialPaid: false,
    totalMonthlyPrice: 5380,
    status: 'assigned',
    assignedBua: mockAssignedBua,
    advancePayment: {
      total: 5380,
      installments: [
        { id: 'inst-1', amount: 1345, dueDate: '2026-01-10', paidDate: '2026-01-08', status: 'paid' },
        { id: 'inst-2', amount: 1345, dueDate: '2026-01-17', paidDate: '2026-01-15', status: 'paid' },
        { id: 'inst-3', amount: 1345, dueDate: '2026-01-24', status: 'pending' },
        { id: 'inst-4', amount: 1345, dueDate: '2026-01-31', status: 'pending' },
      ],
    },
    userName: 'রহিম সাহেব',
    phoneNumber: '01812345678',
    address: 'বাসা ১২, রোড ৫, ধানমন্ডি, ঢাকা',
  },
];

export const mockMonthlyPayments: MonthlyPayment[] = [
  { id: 'mp-1', requestId: 'req-1', month: 'জানুয়ারি', year: 2026, amount: 5380, paidDate: '2026-01-05', status: 'paid' },
  { id: 'mp-2', requestId: 'req-1', month: 'ফেব্রুয়ারি', year: 2026, amount: 5380, status: 'pending' },
];

export const requests = [
  {
    id: "req1",
    cookingTimes: 2,
    numPeople: 4,
    startDate: "2025-01-01",
    salaryPaymentDate: 5,
    totalMonthlyPrice: 12000,
    services: ["বাসন ধোয়া", "রান্না"],
    assignedBua: {
      name: "রিনা বেগম",
      phone: "017xxxxxxxx",
      nidNumber: "1234567890",
      photoUrl: "/bua.png",
    },
  },
];

export const monthlyPayments = [
  {
    id: "pay1",
    requestId: "req1",
    month: "জানুয়ারি",
    year: 2025,
    amount: 12000,
    status: "pending",
  },
];

export const buaHireRequests = [
  {
    id: "req1",
    status: "assigned",
    createdAt: "2025-01-10",
    totalMonthlyPrice: 12000,
    numPeople: 4,
    cookingTimes: 2,
    startDate: "2025-02-01",
    salaryPaymentDate: 5,
    wantTrial: true,
    trialPaid: true,
    trialTimeSlot: "সকাল ৮টা - ৯টা",
    trialDate: "2025-01-20",
    services: ["বাসন ধোয়া", "ঘর পরিষ্কার"],
    userName: "আশিক",
    phoneNumber: "017xxxxxxxx",
    address: "ধানমন্ডি, ঢাকা",
    assignedBua: true,
    advancePayment: {
      total: 3000,
      installments: [
        {
          id: "i1",
          amount: 1000,
          status: "paid",
          paidDate: "2025-01-15",
          dueDate: "2025-01-15",
        },
        {
          id: "i2",
          amount: 1000,
          status: "pending",
          dueDate: "2025-02-15",
        },
        {
          id: "i3",
          amount: 1000,
          status: "pending",
          dueDate: "2025-03-15",
        },
      ],
    },
  },
];

