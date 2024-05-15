import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { langueToIso2, listLanguages } from "../types/language";
import { SelectType } from "../types/select";

export default function SelectLanguage(): JSX.Element {
  const [firstLanguage, setFirstLanguage] = useState<SelectType>({
    value: "english",
    label: "English",
  });
  const [secondLanguage, setSecondLanguage] = useState<SelectType>({
    value: "french",
    label: "French",
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    chrome.storage.sync.get(["firstLanguage", "secondLanguage"], (result) => {
      setFirstLanguage(result.firstLanguage);
      setSecondLanguage(result.secondLanguage);
      i18n.changeLanguage(langueToIso2[result.firstLanguage as any]);
    });
  }, []);

  function handleChangeLanguage(value: SelectType, language: string) {
    chrome.storage.sync.set({ [language]: value });
    if (language === "firstLanguage") {
      i18n.changeLanguage(langueToIso2[value as any]);
      setFirstLanguage(value);
    } else if (language === "secondLanguage") {
      setSecondLanguage(value);
    }
  }

  return (
    <div className="grid grid-flow-col py-6 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
      <div className="flex flex-col px-6">
        <span>{t("options.language.firstLanguage")}</span>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={t("options.language.selectLanguage")}
          optionFilterProp="children"
          onChange={(value) => handleChangeLanguage(value, "firstLanguage")}
          value={firstLanguage}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={listLanguages.map((language) => ({
            value: language,
            label: t(`options.language.list.${language}`),
          }))}
        />
      </div>
      <div className="flex flex-col items-end px-6">
        <span>{t("options.language.secondLanguage")}</span>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={t("options.language.selectLanguage")}
          optionFilterProp="children"
          onChange={(value) => handleChangeLanguage(value, "secondLanguage")}
          value={secondLanguage}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={listLanguages.map((language) => ({
            value: language,
            label: t(`options.language.list.${language}`),
          }))}
        />
      </div>
    </div>
  );
}
