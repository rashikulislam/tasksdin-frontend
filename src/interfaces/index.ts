import { Dispatch, SetStateAction } from "react";
export type TToken = {
  role: string;
  email: string;
};

export interface IConsumer {
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  nid_info: string;
  password: string;
  confirm_password: string;
}

export interface TSetPage {
  setPages: Dispatch<SetStateAction<number>>;
  pages: number;
  steps?: number;
  phone?: string;
  setPhone?: Dispatch<SetStateAction<string>>;
  email?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
}

// Local Tasks consumer all types are below

export interface TaskData {
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  urgency: string;
  type?: string;
  createdAt?: string;
  serviceData?: string;
}

export interface LocalTaskProposalList {
  id: string;
  name: string;
  avatar?: string;
  distance: string;
  bio: string;
  jobSuccessRate: number;
  totalTasksCompleted: number;
  rating: number;
  proposalDescription: string;
  proposedPrice: string;
}

export interface AllTaskTab {
  id: string;
  title: string;
  description: string;
  price: string;
  timePosted: string;
  category: string;
  proposalsCount: number;
  status: "open" | "in_progress" | "completed";
}

export interface Service {
  id: string;
  name: string;
  tags: string[];
  avg_min_price_range: string;
  avg_max_price_range: string;
  duration: string;
  rating: number;
  totalProviders: number;
  image: string;
  slug: string;
  priority: string;
  discount?: string;
  featured?: boolean;
  isPopular?: boolean;
  description: string;
  features: string[];
}

export type PopularServiceItem = {
  id: string;
  title: string;
  tags: string[];
  price: string;
  duration: string;
  rating: number;
  providers: number;
  slug: string;
  image: string;
  discount?: string;
  featured: string | boolean;
  isPopular: string | boolean;
};

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  completedOrders: number;
  rating: number;
  verified: boolean;
}

import { ElementType } from "react";

export interface OfferFeature {
  icon: ElementType;
  title: string;
  subtitle: string;
}

export interface Offer {
  id: number;
  type: "discount" | "new_user" | "premium";
  badge: string;
  buttonText: string;
  title: string;
  description: string;
  color: "primary" | "accent" | "warning";
  features: OfferFeature[];
}

export interface Contract {
  id: string;
  taskTitle: string;
  providerName: string;
  providerPhone: string;
  providerAvatar?: string;
  providerRating: number;
  taskCategory: string;
  status: "in_progress" | "pending" | "completed" | "cancelled";
  startDate: string;
  estimatedCompletion: string;
  price: string;
  description: string;
  location: string;
  isLocationLive?: boolean;
}

export interface ContractDetails {
  id: string;
  taskTitle: string;
  description: string;
  price: string;
  status: "in_progress" | "completed" | "pending" | "cancelled";
  provider: Provider;
  startDate: string;
  estimatedCompletion: string;
  location: string;
}

// PROVIDER

export type TProviderRegPageOne = {
  email: string;
  password: string;
  full_name: string;
  nid_info: string;
  phone_number: string;
};

export type TConsumerRegisterData = {
  full_name: string;
  email: string;
  phone_number?: string;
  password: string;
  accept_terms: true;
};

export type TCurrentLocation = {
  lat: number;
  lng: number;
};

export interface Provider {
  name: string;
  phone: string;
  avatar?: string;
  rating: number;
  completedJobs: number;
  location: string;
}

// MESSAGE & CONVERSATION TYPES

export interface TMessagePageChatAreaProps {
  conversationId: string;
  onBack?: () => void;
}

// NOTOFICATION
export interface INotification {
  id: string;
  giver_id?: string;
  receiver_id: string;
  title: string;
  message: string;
  route?: string;
  type?: string;
  is_read: boolean;
  createdAt: string;
}
