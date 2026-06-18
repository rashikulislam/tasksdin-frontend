import z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gamil.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmil.com": "hotmail.com",
};

const emailFieldBn = z
  .string()
  .min(1, "ইমেইল আবশ্যক")
  .superRefine((val, ctx) => {
    if (!val) return;
    if (!val.includes("@")) {
      ctx.addIssue({ code: "custom", message: "ইমেইলে @ চিহ্ন নেই" });
      return;
    }
    const [, domain] = val.split("@");
    if (!domain || !domain.includes(".")) {
      ctx.addIssue({ code: "custom", message: "ইমেইলে .com বা অনুরূপ ডোমেইন নেই" });
      return;
    }
    const suggestion = DOMAIN_TYPOS[domain.toLowerCase()];
    if (suggestion) {
      ctx.addIssue({
        code: "custom",
        message: `ডোমেইন ভুল মনে হচ্ছে, আপনি কি "${suggestion}" বলতে চেয়েছিলেন?`,
      });
      return;
    }
    if (!emailRegex.test(val)) {
      ctx.addIssue({ code: "custom", message: "সঠিক ইমেইল ঠিকানা দিন" });
    }
  });

const emailFieldEn = z
  .string()
  .min(1, "Email is required")
  .superRefine((val, ctx) => {
    if (!val) return;
    if (!val.includes("@")) {
      ctx.addIssue({ code: "custom", message: 'Email must contain "@" symbol' });
      return;
    }
    const [, domain] = val.split("@");
    if (!domain || !domain.includes(".")) {
      ctx.addIssue({ code: "custom", message: "Email must have a valid domain (e.g. .com, .net)" });
      return;
    }
    const suggestion = DOMAIN_TYPOS[domain.toLowerCase()];
    if (suggestion) {
      ctx.addIssue({ code: "custom", message: `Did you mean "${suggestion}"?` });
      return;
    }
    if (!emailRegex.test(val)) {
      ctx.addIssue({ code: "custom", message: "Invalid email address" });
    }
  });

// LOGIN SCHEMA
export const loginSchemaEn = z.object({
  auth: z.string().min(5, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password too long"),
});

export const loginSchemaBn = z.object({
  auth: z.string().min(1, "ইমেইল আবশ্যক"),
  password: z
    .string()
    .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে")
    .max(15, "পাসওয়ার্ড অনেক বড়"),
});

// CONSUMER / PROVIDER / AGENT REGISTER
export const consumerRegSchemaPageOneEn = z.object({
  email: emailFieldEn,
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{11}$/, "Phone number must be exactly 11 digits (numbers only)"),
  full_name: z.string().min(2, "Full name required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password too long"),
  accept_terms: z.literal(true, { error: "You must accept the Terms & Conditions." }),
});

export const consumerRegSchemaPageOneBn = z.object({
  email: emailFieldBn,
  phone_number: z
    .string()
    .min(1, "ফোন নাম্বার আবশ্যক")
    .regex(/^\d{11}$/, "ফোন নাম্বার ঠিক ১১ সংখ্যার হতে হবে (শুধু সংখ্যা)"),
  full_name: z.string().min(2, "নাম আবশ্যক"),
  password: z
    .string()
    .min(8, "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে")
    .max(15, "পাসওয়ার্ড অনেক বড়"),
  accept_terms: z.literal(true, { error: "শর্তাবলী মেনে নিতে হবে।" }),
});

// ADDRESS SCHEMA (step 3 of onboarding)
export const addressSchemaEn = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  referral_code: z.string().optional(),
});

// PROVIDER (legacy schemas — kept for backward compat)
export const providerRegSchemaPageOneEn = z.object({
  email: emailFieldEn,
  phone_number: z.string().min(10, "Phone number too short"),
  full_name: z.string().min(2, "First name required"),
  nid_info: z.string().min(12, "NID Info is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password too long"),
});

export const providerRegSchemaPageOneBn = z.object({
  email: emailFieldBn,
  phone_number: z.string().min(10, "ফোন নাম্বার খুব ছোট"),
  full_name: z.string().min(2, "নাম আবশ্যক"),
  nid_info: z.string().min(12, "এনআইডি তথ্য আবশ্যক"),
  password: z
    .string()
    .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে")
    .max(15, "পাসওয়ার্ড অনেক বড়"),
});
