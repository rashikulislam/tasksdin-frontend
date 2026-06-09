import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const ReadyToStart = async () => {
  const t = await getTranslations("HomePage.ReadyToStart");

  return (
    <div className="py-20 bg-white dark:bg-black">
      <div className="bg-[#F9F9FA] dark:bg-gradient-to-l dark:from-gray-800 dark:to-gray-900 py-16 px-4">
        <div className="container mx-auto text-center">
          {/* Heading */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {t("title")}
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300">
              {t("description")}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex  items-center justify-center gap-4 sm:gap-6">
            <Link href={"/auth/register/consumer"}>
              <Button
                variant="outline"
                size={"lg"}
                className="flex items-center justify-center gap-2 bg-[#3C83F6] hover:bg-[#3783fc] dark:bg-[#3C83F6] dark:hover:bg-[#3C83F6] text-white hover:text-white w-full cursor-pointer sm:w-auto"
              >
                {t("getServiceBtn")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Button size={"lg"} variant="secondary" className=" cursor-pointer">
              {t("becomeProvider")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToStart;
