import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enSites from "./locales/en/sites.json";
import enSiteStatus from "./locales/en/siteStatus.json";

import ltCommon from "./locales/lt/common.json";
import ltSites from "./locales/lt/sites.json";
import ltSiteStatus from "./locales/lt/siteStatus.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "lt"],

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        common: enCommon,
        sites: enSites,
        siteStatus: enSiteStatus,
      },
      lt: {
        common: ltCommon,
        sites: ltSites,
        siteStatus: ltSiteStatus,
      },
    },
  });