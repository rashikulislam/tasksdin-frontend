import { Button } from "@/components/ui/button";
import { Award, CheckCircle, MapPin, Shield } from "lucide-react";
import { getTranslations } from "next-intl/server";

const LocalWorkBanner = async () => {
  const t = await getTranslations("LocalWorkPage.Banner");

  const features = [1, 2, 3]; // for mapping features

  return (
    <div className="bg-[#F9F9FA] dark:bg-black pb-20">
      <div className="container px-4">
        {/* Banner Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold pt-16">{t("title")}</h1>
          <p className="pt-5 text-lg">{t("description")}</p>

          <div className="flex justify-center pt-10">
            <Button
              size="lg"
              className="px-14 py-4 text-lg cursor-pointer bg-[#3C83F6] dark:bg-[#3C83F6] dark:hover:bg-[#3C83F6] hover:bg-[#3783fc] text-white hover:text-white flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              {t("btn")}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((i) => {
            const Icon = i === 1 ? Shield : i === 2 ? CheckCircle : Award;
            return (
              <div
                key={i}
                className="text-center p-6 rounded-xl shadow bg-white dark:bg-gray-950 py-8 hover:shadow-md transition"
              >
                <Icon className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <div className="pt-2 flex flex-col gap-2">
                  <h1 className="text-lg font-semibold">
                    {t(`feature${i}.title`)}
                  </h1>
                  <p className="text-md text-gray-600 dark:text-gray-300">
                    {t(`feature${i}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocalWorkBanner;
