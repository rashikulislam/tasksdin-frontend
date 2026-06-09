// ────────────────────────────────────────────────────────────────────────────
// Phone OTP verification — DISABLED
// The registration flow no longer depends on phone OTP verification; email
// verification (see EmailVerification.tsx) is now the sole blocking step
// before profile completion. This component is kept (commented out) in case
// phone OTP verification needs to be re-enabled in the future. It is not
// imported anywhere — do not re-introduce the import without first restoring
// the verifyPhone/resendPhoneOtp mutations in auth.features.ts.
// ────────────────────────────────────────────────────────────────────────────

// "use client";
//
// import { useTranslations } from "next-intl";
// import { useForm, Controller, FieldValues } from "react-hook-form";
//
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { TSetPage } from "@/interfaces";
// import { ArrowRight, Loader2 } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
// import { showToast } from "@/components/Reusable/CustomToast";
// import { useVerifyPhoneMutation, useResendPhoneOtpMutation } from "@/redux/features/auth.features";
// import { storeUserInLocalStorage } from "@/service/auth.services";
// import setAccessToken from "@/service/actions/setTokenCookie";
//
// const PhoneNumberVerification = ({ setPages, pages, steps, phone = "" }: TSetPage) => {
//   const t = useTranslations("Auth.ProviderRegister.ThirdPage");
//   const [verifyPhone, { isLoading }] = useVerifyPhoneMutation();
//   const [resendOtp, { isLoading: isResending }] = useResendPhoneOtpMutation();
//
//   const { control, handleSubmit } = useForm<{ otp: string }>({
//     defaultValues: { otp: "" },
//   });
//
//   const onSubmit = async (data: FieldValues) => {
//     if (!data.otp || data.otp.length < 6) {
//       return showToast({
//         type: "error",
//         title: t("otpMissingTitle"),
//         description: t("otpMissingDesc"),
//       });
//     }
//
//     if (!phone) {
//       return showToast({
//         type: "error",
//         description: "Phone number is missing. Please restart registration.",
//       });
//     }
//
//     try {
//       const result = await verifyPhone({
//         phone_number: phone,
//         otp_code: data.otp,
//       }).unwrap();
//
//       if (result?.success && result?.data?.accessToken) {
//         // Store the token so subsequent authenticated requests work
//         await setAccessToken(result.data.accessToken);
//         storeUserInLocalStorage(result.data.accessToken);
//
//         showToast({
//           type: "success",
//           title: t("otpVerifiedTitle"),
//           description: t("otpVerifiedDesc"),
//         });
//
//         // Advance to address step (step 3)
//         setPages(3);
//       } else {
//         showToast({ type: "error", description: result?.message ?? "Verification failed." });
//       }
//     } catch (error: unknown) {
//       const err = error as { data?: { message?: string } };
//       showToast({
//         type: "error",
//         description: err?.data?.message ?? "Invalid or expired OTP. Please try again.",
//       });
//     }
//   };
//
//   const handleResendOTP = async () => {
//     if (!phone) {
//       return showToast({ type: "error", description: "Phone number is missing." });
//     }
//     try {
//       await resendOtp({ phone_number: phone }).unwrap();
//       showToast({
//         type: "success",
//         title: t("otpResentTitle"),
//         description: t("otpResentDesc"),
//       });
//     } catch (error: unknown) {
//       const err = error as { data?: { message?: string } };
//       showToast({
//         type: "error",
//         description: err?.data?.message ?? "Failed to resend OTP.",
//       });
//     }
//   };
//
//   return (
//     <div className="bg-white dark:bg-black h-screen flex flex-col justify-center px-4">
//       <Card className="w-full max-w-md mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 dark:bg-black shadow-xl">
//         <CardHeader>
//           <div className="flex items-center justify-between text-sm text-muted-foreground">
//             {t("step")} {pages}/{steps}
//           </div>
//           <CardTitle className="text-[24px] font-bold text-center">
//             {t("phoneVerificationTitle")}
//           </CardTitle>
//           <CardDescription className="text-center text-gray-500 dark:text-gray-400">
//             {t("phoneVerificationDesc", { phone: phone || "your phone" })}
//           </CardDescription>
//         </CardHeader>
//
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <CardContent className="flex flex-col items-center">
//             <Label className="pb-3">{t("otpLabel")}</Label>
//
//             <Controller
//               name="otp"
//               control={control}
//               render={({ field }) => (
//                 <InputOTP
//                   maxLength={6}
//                   pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
//                   value={field.value}
//                   onChange={field.onChange}
//                   className="flex items-center"
//                 >
//                   <InputOTPGroup className="flex gap-2">
//                     {[...Array(6)].map((_, i) => (
//                       <InputOTPSlot
//                         key={i}
//                         index={i}
//                         className="
//                           h-12 w-12 rounded-lg
//                           border border-gray-300 dark:border-gray-700
//                           bg-white dark:bg-gray-900
//                           text-lg font-semibold text-gray-900 dark:text-gray-100
//                           flex items-center justify-center
//                           shadow-sm
//                           focus:outline-none focus:ring-2
//                           focus:ring-gray-300 dark:focus:ring-gray-600
//                           transition-colors duration-200
//                         "
//                       />
//                     ))}
//                   </InputOTPGroup>
//                 </InputOTP>
//               )}
//             />
//
//             <Button
//               type="button"
//               variant="secondary"
//               size="sm"
//               className="mt-5"
//               onClick={handleResendOTP}
//               disabled={isResending}
//             >
//               {isResending ? (
//                 <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Sending…</>
//               ) : t("resendOTP")}
//             </Button>
//           </CardContent>
//
//           <CardFooter className="flex items-center justify-center pt-5">
//             <Button type="submit" className="cursor-pointer" disabled={isLoading}>
//               {isLoading ? (
//                 <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Verifying…</>
//               ) : (
//                 <>{t("complete")} <ArrowRight className="ml-2 h-4 w-4" /></>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// };
//
// export default PhoneNumberVerification;
