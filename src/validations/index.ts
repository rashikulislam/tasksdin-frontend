import z from "zod";

// LOGIN SCHEMA
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const loginSchemaEn = z.object({
  auth: z.string().min(5, "Email is required"),
  // .regex(emailRegex, "Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password too long"),
});

export const loginSchemaBn = z.object({
  auth: z.string().min(1, "ইমেইল আবশ্যক"),
  // .regex(emailRegex, "সঠিক ইমেইল ঠিকানা দিন"),
  password: z
    .string()
    .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে")
    .max(15, "পাসওয়ার্ড অনেক বড়"),
});

// CONSUMER REGISTER
export const consumerRegSchemaPageOneEn = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Invalid email address"),
  phone_number: z.string().min(10, "Phone number too short").optional().or(z.literal("")),
  full_name: z.string().min(2, "Full name required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password too long"),
  accept_terms: z.literal(true, { error: "You must accept the Terms & Conditions." }),
});

export const consumerRegSchemaPageOneBn = z.object({
  email: z.string().min(1, "ইমেইল আবশ্যক").regex(emailRegex, "সঠিক ইমেইল দিন"),
  phone_number: z.string().min(10, "ফোন নাম্বার খুব ছোট").optional().or(z.literal("")),
  full_name: z.string().min(2, "নাম আবশ্যক"),
  password: z
    .string()
    .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে")
    .max(15, "পাসওয়ার্ড অনেক বড়"),
  accept_terms: z.literal(true, { error: "শর্তাবলী মেনে নিতে হবে।" }),
});

// ADDRESS SCHEMA (step 3 of onboarding)
export const addressSchemaEn = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  referral_code: z.string().optional(),
});

// PROVIDER

export const providerRegSchemaPageOneEn = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Invalid email address"),
  phone_number: z.string().min(10, "Phone number too short"),
  full_name: z.string().min(2, "First name required"),

  nid_info: z.string().min(12, "NID Info is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password too long"),
});

export const providerRegSchemaPageOneBn = z.object({
  email: z.string().min(1, "ইমেইল আবশ্যক").regex(emailRegex, "সঠিক ইমেইল দিন"),
  phone_number: z.string().min(10, "ফোন নাম্বার খুব ছোট"),
  full_name: z.string().min(2, "নাম আবশ্যক"),
  nid_info: z.string().min(12, "এনআইডি তথ্য আবশ্যক"),
  password: z
    .string()
    .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে")
    .max(15, "পাসওয়ার্ড অনেক বড়"),
});
