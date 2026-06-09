import { TProviderRegPageOne } from "@/interfaces";
import { CreateFormStore } from "../store/store";
type TFile = {
  file: File;
};

export const useProviderRegFormStore = CreateFormStore<
  TProviderRegPageOne & TFile
>();

export interface VerificationState {
  nid_image_number: string;
  passport_number: string;
  verified_by: string;

  nid_image_front: File | null;
  nid_image_backend: File | null;
  passport_img: File | null;
  live_image: File | null;
}

export const useVerificationInfoStore = CreateFormStore<VerificationState>();
