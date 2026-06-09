import { TUserLocation } from "./location";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type UrgencyLevel = "low" | "medium" | "high";
export type PriorityLevel = "low" | "medium" | "high";

/* =======================
   Category
======================= */
export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
  description: string;
  discount: number;
  priority: PriorityLevel;
  duration: number | null;
  avg_max_price_range: number;
  avg_min_price_range: number;
  tags: string[];
  rating: number;
  features: string[];
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

/* =======================
   Consumer
======================= */
export interface Consumer {
  full_name: string;
  phone_number: string;
  email: string;
  created_at: string;
  profile_img: string;
  user: {
    locations: TUserLocation[];
  };
}

/* =======================
   Task
======================= */
export interface ITask {
  id: string;
  consumer_id: string;
  task_title: string;
  category_id: string;
  description: string;
  budget: number;
  deadline: string;
  urgency_level: UrgencyLevel;
  is_deleted_by_user: boolean;
  is_deleted_by_admin: boolean;
  status: TaskStatus;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  location_info: string;
  latitude: number;
  longitude: number;
  area: string;
  category: Category;
  consumer: Consumer;
  applied?: boolean;
}
