'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

interface SecurityCardProps {
  twoFactorAuth: boolean;
  onTwoFactorChange: (checked: boolean) => void;
}

export const SecurityCard = ({ twoFactorAuth, onTwoFactorChange }: SecurityCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Shield className="h-5 w-5" />
        Security
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
        </div>
        <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={onTwoFactorChange} />
      </div>
      <Button variant="outline" className="w-full">Change Password</Button>
    </CardContent>
  </Card>
);