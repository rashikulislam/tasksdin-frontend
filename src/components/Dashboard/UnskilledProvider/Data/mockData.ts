export interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  clientName: string;
  clientRating: number;
  postedTime: string;
  tags: string[];
  urgent: boolean;
}

export interface Stats {
  balance: number;
  completedTasks: number;
  rating: number;
  monthlyEarnings: number;
  rank: number;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "বাজার করা এবং বাসায় পৌঁছানো",
    description:
      "স্থানীয় বাজার থেকে দৈনন্দিন প্রয়োজনীয় জিনিসপত্র কিনে বাসায় পৌঁছে দিতে হবে।",
    location: "ধানমন্ডি, ঢাকা",
    price: 300,
    duration: "২ ঘন্টা",
    clientName: "রহিমা খাতুন",
    clientRating: 4.8,
    postedTime: "১০ মিনিট আগে",
    tags: ["জরুরি", "বাজার"],
    urgent: true,
  },
  {
    id: "2",
    title: "অফিস থেকে ডকুমেন্ট সংগ্রহ",
    description:
      "অফিস থেকে কিছু গুরুত্বপূর্ণ কাগজপত্র সংগ্রহ করে নির্দিষ্ট ঠিকানায় পৌঁছে দিতে হবে।",
    location: "মতিঝিল, ঢাকা",
    price: 250,
    duration: "১.৫ ঘন্টা",
    clientName: "করিম আহমেদ",
    clientRating: 4.5,
    postedTime: "২৫ মিনিট আগে",
    tags: ["ডকুমেন্ট", "অফিস"],
    urgent: false,
  },
  {
    id: "3",
    title: "ওষুধ কিনে আনা",
    description:
      "ফার্মেসি থেকে প্রেসক্রিপশন অনুযায়ী ওষুধ কিনে বাসায় পৌঁছে দিতে হবে।",
    location: "উত্তরা, ঢাকা",
    price: 200,
    duration: "১ ঘন্টা",
    clientName: "ফাতেমা বেগম",
    clientRating: 4.9,
    postedTime: "৪৫ মিনিট আগে",
    tags: ["ওষুধ", "জরুরি"],
    urgent: true,
  },
];

export const mockStats: Stats = {
  balance: 2450,
  completedTasks: 127,
  rating: 4.7,
  monthlyEarnings: 8500,
  rank: 15,
};

export const mockTaskHistory = [
  {
    title: "বাজার করা এবং বাসায় পৌঁছানো",
    client: "রহিমা খাতুন",
    location: "ধানমন্ডি",
    amount: 300,
    rating: 5.0,
    time: "২ দিন আগে",
  },
  {
    title: "অফিস থেকে ডকুমেন্ট সংগ্রহ",
    client: "করিম আহমেদ",
    location: "মতিঝিল",
    amount: 250,
    rating: 4.8,
    time: "৩ দিন আগে",
  },
  {
    title: "ওষুধ কিনে আনা",
    client: "ফাতেমা বেগম",
    location: "উত্তরা",
    amount: 200,
    rating: 5.0,
    time: "৫ দিন আগে",
  },
];

export const mockLeaderboard = [
  { rank: 1, name: "সাকিব হাসান", tasks: 95, earnings: 28500 },
  { rank: 2, name: "রফিক উদ্দিন", tasks: 87, earnings: 26100 },
  { rank: 3, name: "নাসির আহমেদ", tasks: 82, earnings: 24600 },
  { rank: 4, name: "মিনহাজ রহমান", tasks: 78, earnings: 23400 },
  { rank: 5, name: "জামিল হোসেন", tasks: 71, earnings: 21300 },
];

export const mockNotifications = [
  {
    id: 1,
    title: "পেমেন্ট সফল",
    message: "আপনার ৳300 টাকা bKash এ জমা হয়েছে",
    time: "১০ মিনিট আগে",
    type: "payment",
    unread: true,
    icon: "💰",
  },
  {
    id: 2,
    title: "নতুন কাজের সুযোগ",
    message: "আপনার এলাকায় একটি নতুন জরুরি কাজ যোগ হয়েছে",
    time: "২৫ মিনিট আগে",
    type: "task",
    unread: true,
    icon: "🔔",
  },
  {
    id: 3,
    title: "কাজ সম্পন্ন",
    message: "রহিমা খাতুন আপনার কাজে 5 স্টার রেটিং দিয়েছেন",
    time: "২ ঘন্টা আগে",
    type: "rating",
    unread: false,
    icon: "⭐",
  },
  {
    id: 4,
    title: "উত্তোলন সফল",
    message: "৳500 টাকা সফলভাবে আপনার ব্যাংক অ্যাকাউন্টে পাঠানো হয়েছে",
    time: "১ দিন আগে",
    type: "withdrawal",
    unread: false,
    icon: "🏦",
  },
];
