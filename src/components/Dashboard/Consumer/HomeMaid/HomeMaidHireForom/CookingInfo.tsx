"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function CookingInfo() {
  // Monthly Form State
  const [numPeople, setNumPeople] = useState("4");
  const [cookingTimes, setCookingTimes] = useState("2");
  const [cookingPeriod, setCookingPeriod] = useState("morning-noon");
  const [morningTime, setMorningTime] = useState("");
  const [noonTime, setNoonTime] = useState("");
  const [nightTime, setNightTime] = useState("");

  const timeOptions = [
    "৭:০০ AM",
    "৭:৩০ AM",
    "৮:০০ AM",
    "৮:৩০ AM",
    "৯:০০ AM",
    "৯:৩০ AM",
  ];

  const noonTimeOptions = [
    "১০:০০ AM",
    "১০:৩০ AM",
    "১১:০০ AM",
    "১১:৩০ AM",
    "১২:০০ PM",
    "১২:৩০ PM",
    "১:০০ PM",
  ];

  const nightTimeOptions = [
    "৪:০০ PM",
    "৫:০০ PM",
    "৬:০০ PM",
    "৭:০০ PM",
    "৮:০০ PM",
  ];

  const renderCookingTimeSelectors = () => {
    const times = parseInt(cookingTimes);

    if (times === 3) {
      return (
        <div className="space-y-3">
          <div>
            <Label>সকালের রান্নার সময়</Label>
            <Select value={morningTime} onValueChange={setMorningTime}>
              <SelectTrigger>
                <SelectValue placeholder="সময় নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>দুপুরের রান্নার সময়</Label>
            <Select value={noonTime} onValueChange={setNoonTime}>
              <SelectTrigger>
                <SelectValue placeholder="সময় নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {noonTimeOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>রাতের রান্নার সময়</Label>
            <Select value={nightTime} onValueChange={setNightTime}>
              <SelectTrigger>
                <SelectValue placeholder="সময় নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {nightTimeOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }

    if (times === 2) {
      return (
        <div className="space-y-3">
          {(cookingPeriod === "morning-noon" ||
            cookingPeriod === "morning-night") && (
            <div>
              <Label>সকালের রান্নার সময়</Label>
              <Select value={morningTime} onValueChange={setMorningTime}>
                <SelectTrigger>
                  <SelectValue placeholder="সময় নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {(cookingPeriod === "morning-noon" ||
            cookingPeriod === "noon-night") && (
            <div>
              <Label>দুপুরের রান্নার সময়</Label>
              <Select value={noonTime} onValueChange={setNoonTime}>
                <SelectTrigger>
                  <SelectValue placeholder="সময় নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {noonTimeOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {(cookingPeriod === "morning-night" ||
            cookingPeriod === "noon-night") && (
            <div>
              <Label>রাতের রান্নার সময়</Label>
              <Select value={nightTime} onValueChange={setNightTime}>
                <SelectTrigger>
                  <SelectValue placeholder="সময় নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {nightTimeOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      );
    }

    if (times === 1) {
      const period = cookingPeriod.split("-")[0] || cookingPeriod;
      return (
        <div>
          <Label>
            {period === "morning"
              ? "সকালের"
              : period === "noon"
                ? "দুপুরের"
                : "রাতের"}{" "}
            রান্নার সময়
          </Label>
          <Select
            value={
              period === "morning"
                ? morningTime
                : period === "noon"
                  ? noonTime
                  : nightTime
            }
            onValueChange={(v) => {
              if (period === "morning") setMorningTime(v);
              else if (period === "noon") setNoonTime(v);
              else setNightTime(v);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="সময় নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {(period === "morning"
                ? timeOptions
                : period === "noon"
                  ? noonTimeOptions
                  : nightTimeOptions
              ).map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return null;
  };
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">রান্নার তথ্য</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Number of people */}
        <div>
          <Label>কতজনের জন্য রান্না?</Label>
          <Input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            min="1"
            max="20"
          />
        </div>

        {/* Cooking times per day */}
        <div>
          <Label>দৈনিক কতবার রান্না?</Label>
          <RadioGroup
            value={cookingTimes}
            onValueChange={setCookingTimes}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="c1" />
              <Label htmlFor="c1" className="cursor-pointer">
                ১ বার
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="c2" />
              <Label htmlFor="c2" className="cursor-pointer">
                ২ বার
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="c3" />
              <Label htmlFor="c3" className="cursor-pointer">
                ৩ বার
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Cooking period selection */}
        {cookingTimes === "2" && (
          <div>
            <Label>কখন রান্না করবে?</Label>
            <RadioGroup
              value={cookingPeriod}
              onValueChange={setCookingPeriod}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning-noon" id="mn" />
                <Label htmlFor="mn" className="cursor-pointer">
                  সকাল ও দুপুর
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning-night" id="mni" />
                <Label htmlFor="mni" className="cursor-pointer">
                  সকাল ও রাত
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noon-night" id="nn" />
                <Label htmlFor="nn" className="cursor-pointer">
                  দুপুর ও রাত
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {cookingTimes === "1" && (
          <div>
            <Label>কখন রান্না করবে?</Label>
            <RadioGroup
              value={cookingPeriod}
              onValueChange={setCookingPeriod}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning" id="m" />
                <Label htmlFor="m" className="cursor-pointer">
                  সকাল
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="noon" id="n" />
                <Label htmlFor="n" className="cursor-pointer">
                  দুপুর
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="night" id="ni" />
                <Label htmlFor="ni" className="cursor-pointer">
                  রাত
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Time selectors */}
        {renderCookingTimeSelectors()}
      </CardContent>
    </Card>
  );
}
