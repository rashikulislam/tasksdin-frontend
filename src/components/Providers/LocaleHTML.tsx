"use client";
import { useEffect } from "react";

const LocaleHTMLSetter = ({
  locale,
  fontClass,
}: {
  locale: string;
  fontClass?: string;
}) => {
  useEffect(() => {
    const html = document.documentElement;
    if (locale) html.lang = locale;
    if (fontClass) {
      html.classList.add(fontClass);

      return () => {
        html.classList.remove(fontClass);
      };
    }
  }, [locale, fontClass]);
  return <div></div>;
};

export default LocaleHTMLSetter;
