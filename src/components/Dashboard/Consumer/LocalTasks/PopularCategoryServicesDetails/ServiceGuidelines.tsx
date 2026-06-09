// components/service-details/ServiceGuidelines.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ServiceGuidelines() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>সেবা গ্রহণের নির্দেশিকা</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {[
          {
            title: "বুকিং করার আগে",
            items: [
              "আপনার প্রয়োজন ও কাজের বিবরণ স্পষ্ট ও বিস্তারিতভাবে উল্লেখ করুন",
              "কাজ শেষ করার কাঙ্ক্ষিত সময়সীমা জানিয়ে দিন",
              "সেবা প্রদানের সময় আপনি উপস্থিত বা যোগাযোগযোগ্য থাকবেন তা নিশ্চিত করুন",
            ],
          },
          {
            title: "সেবা চলাকালীন",
            items: [
              "প্রয়োজনে নিয়মিত যোগাযোগ বজায় রাখুন",
              "কাজের জন্য প্রয়োজনীয় অনুমতি বা উপকরণ সরবরাহ করুন",
              "নিয়মিত কাজের অগ্রগতি পর্যালোচনা করুন",
            ],
          },
          {
            title: "কাজ সম্পন্ন হওয়ার পর",
            items: [
              "সম্পন্ন কাজটি ভালোভাবে যাচাই করুন",
              "আপনার মতামত ও রেটিং প্রদান করুন",
              "পেমেন্ট স্বয়ংক্রিয়ভাবে প্রক্রিয়াজাত করা হবে",
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold text-lg mb-2">{section.title}</h4>
            <ul className="text-sm md:text-[16px] text-muted-foreground space-y-1 list-disc pl-5">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
