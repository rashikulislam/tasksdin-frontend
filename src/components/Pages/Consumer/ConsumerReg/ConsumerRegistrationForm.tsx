"use client";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Reusable/CustomInput";

import { TConsumerRegisterData, TSetPage } from "@/interfaces";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  consumerRegSchemaPageOneBn,
  consumerRegSchemaPageOneEn,
} from "@/validations";

import { useCreateConsumerAccountMutation } from "@/redux/features/auth.features";
import { modifyRegistrationInfo } from "@/utils/modifyRegistrationInfo";
import { showToast } from "@/components/Reusable/CustomToast";

const ConsumerRegistrationForm = ({ setPages, pages, setEmail }: TSetPage) => {
  const [mutateAsync, { isLoading }] = useCreateConsumerAccountMutation();
  const t = useTranslations("Auth.ProviderRegister.FirstPage");
  const locale = useLocale();

  const regSchema =
    locale === "en" ? consumerRegSchemaPageOneEn : consumerRegSchemaPageOneBn;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TConsumerRegisterData>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      phone_number: "",
    },
  });

  const onSubmit: SubmitHandler<TConsumerRegisterData> = async (data) => {
    try {
      const info = modifyRegistrationInfo(data);
      const result = await mutateAsync(info).unwrap();

      if (result?.success) {
        // Registration always proceeds to email verification next (phone OTP disabled)
        setEmail?.(result?.data?.email ?? data.email ?? "");
        setPages(2);
      } else {
        showToast({ type: "error", description: result?.message });
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      showToast({
        type: "error",
        description: err?.data?.message ?? "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-black flex flex-col py-5 min-h-screen">
      <div className="container mx-auto">
        <Card className="w-full max-w-md mx-auto rounded-2xl border-2 border-gray-300 dark:border-gray-800 dark:bg-black shadow-2xl bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("step")} {pages}/3
              </span>
            </div>

            <CardTitle className="text-[28px] font-bold text-center">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 text-center">
              {t("description")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-2.5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CustomInput
                name="full_name"
                type="text"
                label={t("name")}
                placeholder={t("namePlaceholder")}
                register={register}
                required
                error={errors.full_name!}
              />

              <CustomInput
                name="email"
                type="text"
                label={t("email")}
                placeholder="johndoe@example.com"
                register={register}
                required
                error={errors.email!}
              />

              <CustomInput
                name="phone_number"
                type="text"
                label={`${t("phone")} (optional)`}
                placeholder={t("phonePlaceholder")}
                register={register}
                error={errors.phone_number!}
              />

              <CustomInput
                name="password"
                type="password"
                label={t("password")}
                placeholder={t("password")}
                register={register}
                required
                error={errors.password!}
              />

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="accept_terms"
                  {...register("accept_terms")}
                  className="mt-1 h-4 w-4 accent-blue-600 cursor-pointer"
                />
                <label
                  htmlFor="accept_terms"
                  className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-500 underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              {errors.accept_terms && (
                <p className="text-xs text-red-500 -mt-1">
                  {errors.accept_terms.message as string}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <Button variant="secondary">
                  <Link href={`/${locale}`} className="flex items-center gap-1">
                    <ArrowLeft /> Back to Home
                  </Link>
                </Button>

                <Button
                  disabled={isLoading}
                  type="submit"
                  className={`cursor-pointer ${
                    isLoading
                      ? "bg-blue-800 hover:bg-blue-800"
                      : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  {t("next")}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="mx-auto">
            <Button
              variant="link"
              className="text-sm cursor-pointer text-blue-500"
            >
              {t("haveAccount")}{" "}
              <Link href={"/auth/sign-in"}> {t("login")} </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerRegistrationForm;
