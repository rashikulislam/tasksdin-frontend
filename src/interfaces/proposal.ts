import { TUserLocation } from "./location";
import { ITask } from "./task";

export type IProposal = {
  id: string;
  provider_id: string;
  task_id: string;
  description: string;
  match_type: string | null;
  proposal_price: number;
  latitude: number;
  longitude: number;
  completion_date: string | null;
  payment_status: boolean;
  end_task: boolean;
  accepted_date: Date;
  is_accepted: boolean;
  status: "ON_GOING" | "PENDING" | "COMPLETE" | "DENY";
  created_at: string;
  updated_at: string;
  task: ITask;
  provider: INonSkillProviderDetails;
  conversation: IConversation;
};

export interface IConversation {
  id: string;
}

export interface INonSkillProviderDetails {
  provider_id: string;
  user_id: string;
  email: string;
  phone_number: string;
  full_name: string;
  user: {
    ratings: [{ rate: number }];
    locations: TUserLocation[];
  };
  profile_img: string;
  nid_image_front: string;
  nid_image_backend: string;
  nid_image_number: string;
  passport_img: string;
  passport_number: string;
  live_image: string;
  created_at: string;
  updated_at: string;
}

// FOR PROVIDER CONTRACT DETAILS
export interface INonSkillContractProvider {
  id: string;
  provider_id: string;
  task_id: string;
  description: string;
  match_type: string | null;
  proposal_price: number;
  completion_date: string | null;
  is_accepted: boolean;
  latitude: number;
  longitude: number;
  payment_status: boolean;
  end_task: boolean;
  status: "ON_GOING" | "PENDING" | "COMPLETE" | "DENY";
  created_at: string;
  updated_at: string;
  accepted_date: string;
  task: ITaskWithConsumer;
  conversation: IConversation;
  totalJobPosted: number;
}
export interface ITaskWithConsumer {
  task_title: string;
  deadline: string;
  description: string;
  consumer: IConsumer;
  latitude: number;
  longitude: number;
}

export interface IConsumer {
  consumer_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  profile_img: string | null;
  created_at: string;
  user: {
    locations: TUserLocation[];
  };
}
