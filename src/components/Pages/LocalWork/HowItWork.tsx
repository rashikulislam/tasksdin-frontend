import { getTranslations } from "next-intl/server";

const HowItWork = async () => {
  const t = await getTranslations("LocalWorkPage.HowItWork");

  return (
    <div className="bg-white dark:bg-black">
      <div className="container py-4 lg:py-20 px-4">
        {/* Heading */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-center text-4xl font-bold ">{t("title")}</h1>
          <p className="text-center pt-2 text-lg">{t("description")}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto pt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="text-center p-6 bg-white dark:bg-gray-950 py-8 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center w-20 h-20">
                <span className="font-bold text-primary text-2xl">
                  {t(`feature${i}.number`)}
                </span>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <h1 className="text-lg font-semibold">
                  {t(`feature${i}.title`)}
                </h1>
                <p className="text-md text-gray-600 dark:text-gray-300">
                  {t(`feature${i}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
