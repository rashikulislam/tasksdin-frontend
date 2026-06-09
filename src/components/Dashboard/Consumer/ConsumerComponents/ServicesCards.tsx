import Image from "next/image";
import Link from "next/link";
export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  image: string;
  offerPercent: number;
  offerColor: string;
  href: string;
}

export const services: ServiceItem[] = [
  {
    id: 4,
    name: "লোকাল হেল্পার",
    description: "কাছাকাছি বিশ্বস্ত লোকাল সহায়তা",
    image:
      "https://i.ibb.co.com/W4zgG8zz/Gemini-Generated-Image-m5y1ujm5y1ujm5y1.png",
    offerPercent: 25,
    offerColor: "bg-blue-500",
    href: "consumer/local-tasks",
  },
  {
    id: 1,
    name: "কাজের বুয়া",
    description: "ঘরের কাজের জন্য বুয়া",
    image:
      "https://i.ibb.co.com/W4zgG8zz/Gemini-Generated-Image-m5y1ujm5y1ujm5y1.png",
    offerPercent: 20,
    offerColor: "bg-red-500",
    href: "consumer/maid-service",
  },
  
  {
    id: 3,
    name: "বাসা ভাড়া",
    description: "সহজে কাছাকাছি বাসা ভাড়া",
    image:
      "https://i.ibb.co.com/W4zgG8zz/Gemini-Generated-Image-m5y1ujm5y1ujm5y1.png",
    offerPercent: 10,
    offerColor: "bg-yellow-500",
    href: "consumer/house-rental",
  },
  {
    id: 2,
    name: "লোকাল ফ্রিল্যান্সার",
    description: "লোকাল ডিজিটাল কাজের সমাধান",
    image:
      "https://i.ibb.co.com/W4zgG8zz/Gemini-Generated-Image-m5y1ujm5y1ujm5y1.png",
    offerPercent: 15,
    offerColor: "bg-green-500",
    href: "local-freelancer",
  },
];

const ServicesCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <Link key={service.id} href={service.href}>
          <div className="relative text-center  rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition pb-5">
            {/* Offer badge */}

            {/* Image */}
            <div className="relative w-full h-24 mx-auto mb-4">
              <Image
                src={
                  "https://i.ibb.co.com/W4zgG8zz/Gemini-Generated-Image-m5y1ujm5y1ujm5y1.png"
                }
                alt={service.name}
                height={100}
                width={100}
                className="w-full h-24 rounded-t-md object-cover"
              />{" "}
            </div>

            {/* Service Name */}
            <h2 className="text-lg font-semibold mb-2 px-1">{service.name}</h2>

            {/* Description */}
            <p className="text-sm px-1 text-gray-600 dark:text-gray-400 leading-relaxed">
              {service.description}
            </p>

            <p
              className={` ${service.offerColor} text-white text-xs w-max mx-auto mt-2 font-semibold px-3 py-1 rounded-full`}
            >
              {service.offerPercent}% ছাড়
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ServicesCards;
