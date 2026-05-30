import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "lt", label: "LT" },
];

export default function LanguageSelect() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language.split("-")[0];

  const handleChange = async (language: string) => {
    await i18n.changeLanguage(language);
  };

  return (
    <div className="hidden items-center gap-2 rounded-lg border border-[#e6e8ec] bg-white px-2 py-1.5 sm:flex">
      <Languages size={16} className="text-[#6b7280]" />

      <select
        value={currentLanguage}
        onChange={(event) => handleChange(event.target.value)}
        className="bg-transparent text-sm font-semibold text-[#1f2937] outline-none"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}