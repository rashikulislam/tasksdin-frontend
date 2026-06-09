"use client";
import { useLocale, useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
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
import { loginSchemaBn, loginSchemaEn } from "@/validations";
import Link from "next/link";
import { useState } from "react";
import { showToast } from "@/components/Reusable/CustomToast";
import { userLogin } from "@/service/actions/userLogin";
import { useRouter } from "next/navigation";
import { storeUserInLocalStorage } from "@/service/auth.services";

type ILoginCredentials = z.infer<typeof loginSchemaEn>;

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("Auth.SignIn");
  const locale = useLocale();
  const loginSchema = locale === "en" ? loginSchemaEn : loginSchemaBn;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      auth: "prorasikul@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit: SubmitHandler<ILoginCredentials> = async (data) => {
    setIsLoading(true);

    try {
      const result = await userLogin(data);
      setIsLoading(false);
      if (result?.success && result?.redirectPath) {
        showToast({
          type: "success",
          title: "",
          description: result?.message,
        });

        storeUserInLocalStorage(result?.data?.accessToken);
        router.push(result.redirectPath);
      } else {
        showToast({
          type: "error",
          description: result?.message,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoading(false);
    }
  };
  // pt-[75px]
  return (
    <div className="bg-gray-50 dark:bg-black mx-auto ">
      <div className="container flex flex-col justify-center items-center h-screen">
        <Card className="w-full max-w-md mx-auto  rounded-2xl dark:border-4 border-gray-300 dark:border-gray-800 dark:bg-black shadow  bg-white">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">{t("title")}</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              {t("description")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-3 lg:5"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email */}

              <CustomInput
                name="auth"
                type="text"
                label={t("email")}
                placeholder="johndoe@example.com"
                register={register}
                required
                error={errors.auth!}
              />

              <CustomInput
                label={t("password")}
                name="password"
                type="password"
                placeholder="*******"
                required
                register={register}
                error={errors.password!}
              />

              <div className="flex items-end">
                <a
                  href="#"
                  className="ml-auto text-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-4"
                >
                  {t("forgot")}
                </a>
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-5"
              >
                {t("login")}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <div className="relative w-full flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
              <span className="mx-2 text-xs text-gray-500">{t("or")}</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 py-5 cursor-pointer"
            >
              {/* Google icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.6 12.23c0-.79-.07-1.54-.21-2.27H12v4.3h5.39a4.62 4.62 0 01-2 3.03v2.52h3.23c1.89-1.74 2.98-4.31 2.98-7.58z"
                  fill="#4285F4"
                />
                <path
                  d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.23-2.52c-.89.6-2.03.95-3.38.95-2.6 0-4.8-1.75-5.58-4.1H3.1v2.58A9.99 9.99 0 0012 22z"
                  fill="#34A853"
                />
                <path
                  d="M6.42 13.89A5.99 5.99 0 016 12c0-.66.12-1.29.34-1.89V7.53H3.1A9.98 9.98 0 002 12c0 1.61.38 3.13 1.1 4.47l3.32-2.58z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 6.27c1.47 0 2.8.5 3.84 1.48l2.87-2.87C16.95 2.9 14.69 2 12 2a9.99 9.99 0 00-8.9 5.53l3.32 2.58c.78-2.35 2.98-4.1 5.58-4.1z"
                  fill="#EA4335"
                />
              </svg>
              {t("google")}
            </Button>

            <Link href={"/auth/register/auth-choice"}>
              <Button
                variant="link"
                className="text-sm text-blue-500 cursor-pointer"
              >
                {t("createAccount")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
