import { Clock, Shield, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

const HomeBanner = async () => {
  const t = await getTranslations("HomePage");

  return (
    <div className="bg-[#F9F9FA] dark:bg-black min-h-[75vh]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span>{t("Banner.titlePart1")}</span>{" "}
            <span className="text-primary">{t("Banner.titlePart2")}</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300">
            {t("Banner.description")}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {/* Service 1 */}
          <div className="text-center p-6 rounded-xl shadow-sm bg-white dark:bg-gray-900 py-8 hover:shadow-lg transition">
            <Clock className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-lg font-semibold mb-2">
              {t("Banner.services.service1")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("Banner.services.serviceDescription1")}
            </p>
          </div>

          {/* Service 2 */}
          <div className="text-center p-6 rounded-xl shadow-sm bg-white dark:bg-gray-900 py-8 hover:shadow-lg transition">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-lg font-semibold mb-2">
              {t("Banner.services.service2")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("Banner.services.serviceDescription2")}
            </p>
          </div>

          {/* Service 3 */}
          <div className="text-center p-6 rounded-xl shadow-sm bg-white dark:bg-gray-900 py-8 hover:shadow-lg transition">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-lg font-semibold mb-2">
              {t("Banner.services.service3")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("Banner.services.serviceDescription3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
