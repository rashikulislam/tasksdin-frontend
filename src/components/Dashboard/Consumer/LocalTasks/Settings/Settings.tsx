"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AccountInfoCard } from "./AccountInfoCard";
import { SecurityCard } from "./SecurityCard";
import { PreferencesCard } from "./PreferencesCard";
import { ActionButtons } from "./ActionButtons";

const ConsumerSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    email: "rahim@example.com",
    phone: "+৮৮০১৭১২৩৪৫৬৭৮",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: false,
    language: "bn",
    twoFactorAuth: false,
  });

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K],
  ) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested");
    toast({
      title: "Account deletion requested",
      description: "Please contact support to complete account deletion.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <AccountInfoCard
        email={settings.email}
        phone={settings.phone}
        onEmailChange={(v) => updateSetting("email", v)}
        onPhoneChange={(v) => updateSetting("phone", v)}
      />

      {/* <NotificationBell
        emailNotifications={settings.emailNotifications}
        smsNotifications={settings.smsNotifications}
        pushNotifications={settings.pushNotifications}
        onEmailChange={(v) => updateSetting("emailNotifications", v)}
        onSMSChange={(v) => updateSetting("smsNotifications", v)}
        onPushChange={(v) => updateSetting("pushNotifications", v)}
      /> */}

      <SecurityCard
        twoFactorAuth={settings.twoFactorAuth}
        onTwoFactorChange={(v) => updateSetting("twoFactorAuth", v)}
      />

      <PreferencesCard
        darkMode={settings.darkMode}
        language={settings.language}
        onDarkModeChange={(v) => updateSetting("darkMode", v)}
        onLanguageChange={(v) => updateSetting("language", v)}
      />

      <ActionButtons onSave={handleSave} onDelete={handleDeleteAccount} />
    </div>
  );
};

export default ConsumerSettings;
