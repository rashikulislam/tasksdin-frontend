import { TUserLocation } from "./location";
import { IConsumer } from "./proposal";

export type Gender = "MALE" | "FEMALE" | "OTHERS";

export interface IHomeMaid {
  id: string;
  name: string;
  agent_id: string;
  phone_number: string;
  nid: string;
  skills: string[];
  description: string;
  lat: number;
  lng: number;
  address_details: string;
  gender: Gender;
  nid_front: string;
  nid_back: string;
  profile_img: string;
  is_verified: boolean;
  salary_expectation: number;
  working_hours: string;
  work_time: string;
  createdAt: string;
  updatedAt: string;
  distance?: number; // not in db just manage location distance
}

// MAID APPLY
export enum CookingTime {
  MORNING = "morning",
  NOON = "noon",
  NIGHT = "night",
  MORNING_NOON = "morning_noon",
  MORNING_NIGHT = "morning_night",
  NOON_NIGHT = "noon_night",
  ALL = "all",
}

export enum STATUS {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}

export interface IMaidOrder {
  id: string;

  people: number;
  timesPerDay: number;
  cookingTime: CookingTime;

  morningCookingTime?: string | null;
  noonCookingTime?: string | null;
  nightCookingTime?: string | null;

  clothWashing?: string | null;
  clothWashingAmount?: number | null;

  cleaningToilet?: string | null;
  cleaningToiletAmount?: number | null;

  address: string;

  childAge?: number | null;
  childcareHour?: number | null;
  childCareAmount?: number | null;

  startingDate: string; // API থেকে string আসে
  paymentDate: string;

  consumerName: string;
  consumerPhoneNumber: string;

  freeTrailDate?: string | null;
  trailTime?: string | null;

  consumerId: string;
  consumer: IConsumer;
  totalBill: number;
  status: STATUS;
  maidId: string;
  maid: IHomeMaid;
  maidAbsences: TMaidAbsence[];
  createdAt: string;
  updatedAt: string;
  _count?: { maidAbsences: number };
  maidComplains: IMaidComplain[];
}

export type TAssignMaidModal = {
  order_id: string;
  full_name: string;
  mobile_number: string;
  address: string;
  consumer_location: TUserLocation;
};

export type TMaidAbsence = {
  start_date: string;
  end_date: string;
  id: string;
  assignId: string;
  orderId: string;
  reason: string;
  text: string;
  assignMaid?: IHomeMaid;
};

export interface IMaidComplain {
  id: string;
  orderId: string;
  description?: string;
  is_solved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
