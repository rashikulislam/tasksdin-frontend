import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { getTranslations } from "next-intl/server";

const BecomeProvider = async () => {
  const t = await getTranslations("LocalWorkPage.BecomeProvider");
  return (
    <div className="py-20 bg-white dark:bg-black">
      <div className="bg-[#F9F9FA] dark:bg-gradient-to-l dark:from-gray-800 dark:to-gray-900 py-16 px-4">
        <div className="container pb-5  px-4">
          {/* Heading */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-center text-4xl font-bold ">{t("title")}</h1>
            <p className="text-center pt-2 text-lg">{t("description")}</p>
          </div>

          {/* Features Grid */}

          <div
            className={`gap-4 pt-8 justify-center flex flex-col sm:flex-row`}
          >
            <Button
              size="lg"
              className={`px-8 cursor-pointer bg-[#3C83F6] dark:bg-[#3C83F6] dark:hover:bg-[#3C83F6] hover:bg-[#3783fc] text-white hover:text-white `}
            >
              <Award className="w-5 h-5 mr-2" />
              {t("joinAsProvider")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`px-8 cursor-pointer `}
            >
              {t("more")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeProvider;
