// components/contract/ProviderInfoCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, MessageCircle, Map } from "lucide-react";
import { INonSkillProviderDetails } from "@/interfaces/proposal";
import { calculateRatings } from "@/utils/calculateRating";
import Link from "next/link";
import { Rating, Star } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
export default function ProviderInfoCard({
  provider,
  conversationId,
  longitude,
  latitude,
}: {
  provider: INonSkillProviderDetails;
  conversationId: string;
  longitude: number;
  latitude: number;
}) {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>প্রোভাইডারের তথ্য</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage src={provider?.profile_img} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {provider?.full_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-semibold text-lg">{provider?.full_name}</h3>

            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-500 pt-1.5">
                  {calculateRatings(provider?.user?.ratings)}
                </span>
                <div className="flex">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={Number(calculateRatings(provider?.user?.ratings))}
                    itemStyles={myStyles}
                    readOnly
                  />
                </div>
              </div>

              {/* <span className="text-sm text-muted-foreground">
                • {provider.completedTasks} টি কাজ সম্পন্ন
              </span> */}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">সম্পর্কে</h4>
          {/* <p className="text-sm text-muted-foreground">{provider.bio}</p> */}
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">যোগাযোগের তথ্য</h4>

          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{provider?.phone_number}</span>
            </div>

            <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{provider?.email}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={`/dashboard/consumer/local-tasks/messages?con=${conversationId}`}
          >
            <Button className="w-full" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              প্রোভাইডারকে মেসেজ করুন
            </Button>
          </Link>

          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            className="w-full"
            target="_blank"
          >
            <Button className="w-full" size="lg" variant={"secondary"}>
              <Map className="w-4 h-4 mr-2" />
              লোকেশন দেখুন
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
