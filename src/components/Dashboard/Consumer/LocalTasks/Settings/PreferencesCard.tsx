'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Globe } from "lucide-react";

interface PreferencesCardProps {
  darkMode: boolean;
  language: string;
  onDarkModeChange: (checked: boolean) => void;
  onLanguageChange: (value: string) => void;
}

export const PreferencesCard = ({
  darkMode,
  language,
  onDarkModeChange,
  onLanguageChange,
}: PreferencesCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Globe className="h-5 w-5" />
        App Preferences
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
        </div>
        <Switch id="dark-mode" checked={darkMode} onCheckedChange={onDarkModeChange} />
      </div>

      <div>
        <Label htmlFor="language">Language</Label>
        <select
          id="language"
          className="w-full mt-1 p-2 border border-border rounded-md bg-background"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="bn">বাংলা</option>
          <option value="en">English</option>
        </select>
      </div>
    </CardContent>
  </Card>
);