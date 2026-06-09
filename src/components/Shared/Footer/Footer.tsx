"use client";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { BsCreditCard2Front, BsShield } from "react-icons/bs";
import { IoLogoBitcoin } from "react-icons/io";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("Footer");
  const pathname = usePathname();
  const restrictedPaths = ["/auth", "/auth", "/dashboard", "/dashboard"];
  const isRestricted = restrictedPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      {isRestricted ? (
        ""
      ) : (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-12">
            {/* Top Section */}
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MdOutlineMobileFriendly className="w-6 h-6 text-blue-400" />
                  <span className="text-xl font-bold text-blue-500">
                    Tasks Din
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t("companyDescription")}
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4" /> {t("email")}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone className="w-4 h-4" /> {t("phone")}
                  </li>
                  <li className="flex items-center gap-2">
                    <FaMapMarkerAlt className="w-4 h-4" /> {t("address")}
                  </li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  {t("services")}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {t.raw("serviceList").map((service: string, i: number) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  {t("company")}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {t
                    .raw("companyLinks")
                    .map((link: { label: string; href: string }, i: number) => (
                      <li key={i}>
                        <Link href={link.href} className="hover:text-blue-500">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  {t("support")}
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {t
                    .raw("supportLinks")
                    .map((link: { label: string; href: string }, i: number) => (
                      <li key={i}>
                        <Link href={link.href} className="hover:text-blue-500">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-12">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
                {t("paymentMethods")}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center justify-center gap-2 border rounded-lg py-2 px-4">
                  <BsCreditCard2Front className="w-5 h-5 text-blue-500" />
                  <span>{t.raw("payments")[0]}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border rounded-lg py-2 px-4">
                  <IoLogoBitcoin className="w-5 h-5 text-green-500" />
                  <span>{t.raw("payments")[1]}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border rounded-lg py-2 px-4">
                  <span className="text-green-500 font-bold text-lg">$</span>
                  <span>{t.raw("payments")[2]}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border rounded-lg py-2 px-4">
                  <BsShield className="w-5 h-5 text-yellow-400" />
                  <span>{t.raw("payments")[3]}</span>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("copyright")}
              </p>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <FaFacebookF className="w-5 h-5 cursor-pointer hover:text-blue-600" />
                <FaTwitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                <FaInstagram className="w-5 h-5 cursor-pointer hover:text-pink-500" />
                <FaYoutube className="w-5 h-5 cursor-pointer hover:text-red-600" />
              </div>
              <button className="flex items-center gap-2 border mt-5 md:mt-0 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <MdOutlineMobileFriendly className="w-4 h-4" />{" "}
                {t("downloadApp")}
              </button>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
