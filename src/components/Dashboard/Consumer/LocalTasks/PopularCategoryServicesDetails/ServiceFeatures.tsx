// components/service-details/ServiceFeatures.tsx
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ServiceFeaturesProps = {
  features: string[];
};

export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>সেবা সুবিধাসমূহ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
