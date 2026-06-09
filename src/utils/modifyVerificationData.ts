import { VerificationState } from "@/zustand/slice";

const modifyVerificationData = (data: VerificationState): FormData => {
  const {
    live_image,
    nid_image_backend,
    nid_image_front,
    nid_image_number,
    passport_img,
    passport_number,
    verified_by,
  } = data;

  const formData = new FormData();

  // common
  formData.append("verified_by", verified_by);
  if (live_image) {
    formData.append("live_image", live_image);
  }

  if (verified_by === "nid") {
    if (nid_image_front) formData.append("nid_image_front", nid_image_front);
    if (nid_image_backend)
      formData.append("nid_image_backend", nid_image_backend);
    if (nid_image_number) formData.append("nid_image_number", nid_image_number);
  } else {
    if (passport_img) formData.append("passport_img", passport_img);
    if (passport_number) formData.append("passport_number", passport_number);
  }

  return formData;
};

export default modifyVerificationData;
