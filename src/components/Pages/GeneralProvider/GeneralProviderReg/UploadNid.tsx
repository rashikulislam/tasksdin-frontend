"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TSetPage } from "@/interfaces";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { showToast } from "@/components/Reusable/CustomToast";
import { useProviderRegFormStore } from "@/zustand/slice";

const UploadNid = ({ setPages, pages, steps }: TSetPage) => {
  const t = useTranslations("Auth.ProviderRegister.SecondPage");
  const { setData, data } = useProviderRegFormStore();
  const [file, setFile] = useState<File | null>(data.file as File);
  const [isLoading, setIsLoading] = useState(false);
  const handleGoNext = () => {
    if (!file) {
      return showToast({
        type: "error",
        title: "",
        description: t("fileMissingDesc"),
      });
    }

    setIsLoading(true);
    setTimeout(() => {
      setData({ file });
      setIsLoading(false);
      setPages(3);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-black h-screen flex flex-col justify-center py-5">
      <div className="container mx-auto">
        <Card className="w-full max-w-md mx-auto rounded-2xl border-2 border-gray-300 dark:border-gray-800 dark:bg-black shadow-2xl bg-white">
          <CardHeader>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {t("step")} {pages}/{steps}
            </div>

            <CardTitle className="text-[24px] font-bold text-center">
              {t("nidTitle")}
            </CardTitle>
            <CardDescription className="text-center text-gray-500 dark:text-gray-400">
              {t("nidDescription")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <label
              htmlFor="file-upload"
              className="block border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                {file ? file.name : t("uploadPlaceholder")}
              </p>

              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
                required
              />

              <Button variant="outline" asChild className="mx-auto">
                <span>{t("selectFile")}</span>
              </Button>
            </label>

            {file && (
              <div className="flex items-center pt-2 justify-center text-green-600">
                <Check className="h-5 w-5 mr-2" />
                {t("fileUploaded")}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => setPages(1)}
              className="cursor-pointer"
            >
              <ArrowLeft /> {t("back")}
            </Button>

            <Button
              disabled={isLoading}
              onClick={handleGoNext}
              type="submit"
              className={`cursor-pointer
                    ${
                      isLoading
                        ? "bg-blue-800 hover:bg-blue-800"
                        : "bg-blue-600 hover:bg-blue-500"
                    }`}
            >
              {t("next")}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UploadNid;
