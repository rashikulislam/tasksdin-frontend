import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Briefcase, Home, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const OurServices = async () => {
  const t = await getTranslations("HomePage.OurServices");

  const services = t.raw("services") as {
    title: string;
    description: string;
    features: string[];
    link: string;
  }[];

  const icons = [Home, Briefcase, Wrench, Users];
  const colors = ["#5694F7", "#10d876", "#ee6028", "#f2c04b"];

  return (
    <div className="bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold pt-10">
            {t("title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mt-12">
          {services.map((service, idx) => {
            const Icon = icons[idx % icons.length];
            const color = colors[idx % colors.length];

            return (
              <div
                key={idx}
                className="flex flex-col justify-between h-full rounded-2xl border shadow hover:shadow-xl transition-all bg-white dark:bg-gray-900 p-6"
              >
                {/* Title with icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-xl shadow-md flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {service.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  size={"lg"}
                  className="mt-auto w-full md:w-auto max-w-full md:max-w-max cursor-pointer py-2"
                >
                  <Link
                    href={"/auth/sign-in"}
                    className="inline-flex items-center gap-2"
                  >
                    {t("servicesBtn")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
