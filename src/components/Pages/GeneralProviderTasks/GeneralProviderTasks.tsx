import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, MapPin, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  clientName: string;
  clientRating: number;
  postedTime: string;
  tags: string[];
  urgent: boolean;
}
const mockTasks: Task[] = [
  {
    id: "1",
    title: "বাজার করা এবং বাসায় পৌঁছানো",
    description:
      "স্থানীয় বাজার থেকে দৈনন্দিন প্রয়োজনীয় জিনিসপত্র কিনে বাসায় পৌঁছে দিতে হবে।",
    location: "ধানমন্ডি, ঢাকা",
    price: 300,
    duration: "২ ঘন্টা",
    clientName: "রহিমা খাতুন",
    clientRating: 4.8,
    postedTime: "১০ মিনিট আগে",
    tags: ["জরুরি", "বাজার"],
    urgent: true,
  },
  {
    id: "2",
    title: "অফিস থেকে ডকুমেন্ট সংগ্রহ",
    description:
      "অফিস থেকে কিছু গুরুত্বপূর্ণ কাগজপত্র সংগ্রহ করে নির্দিষ্ট ঠিকানায় পৌঁছে দিতে হবে।",
    location: "মতিঝিল, ঢাকা",
    price: 250,
    duration: "১.৫ ঘন্টা",
    clientName: "করিম আহমেদ",
    clientRating: 4.5,
    postedTime: "২৫ মিনিট আগে",
    tags: ["ডকুমেন্ট", "অফিস"],
    urgent: false,
  },
  {
    id: "3",
    title: "ওষুধ কিনে আনা",
    description:
      "ফার্মেসি থেকে প্রেসক্রিপশন অনুযায়ী ওষুধ কিনে বাসায় পৌঁছে দিতে হবে।",
    location: "উত্তরা, ঢাকা",
    price: 200,
    duration: "১ ঘন্টা",
    clientName: "ফাতেমা বেগম",
    clientRating: 4.9,
    postedTime: "৪৫ মিনিট আগে",
    tags: ["ওষুধ", "জরুরি"],
    urgent: true,
  },
];

const GeneralProviderTasks = () => {
  return (
    <div className="container">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">নতুন কাজসমূহ</h3>
        <Badge variant="secondary" className="text-xs">
          আপনার এলাকায় {mockTasks.length}টি কাজ
        </Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-5 pt-10">
        {mockTasks?.map((task) => (
          <Card
            key={task.id}
            className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-sm leading-tight">
                        {task.title}
                      </h4>
                      {task.urgent && (
                        <Badge
                          variant="destructive"
                          className="text-xs px-2 py-0.5"
                        >
                          জরুরি
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {task.tags.map((tag) => (
                    <Badge
                      variant={"outline"}
                      key={tag}
                      className="text-xs px-2 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{task.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{task.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="font-semibold text-green-600">
                      ৳{task.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{task.clientName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">
                        {task.clientRating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      • {task.postedTime}
                    </span>
                  </div>
                  <Button size="sm" className="h-8 px-4 text-xs font-medium">
                    গ্রহণ করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GeneralProviderTasks;
