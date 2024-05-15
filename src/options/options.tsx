import React from "react";
import SelectLanguage from "./selectLanguage";
import { useTranslation } from "react-i18next";
import SelectAi from "./selectAi";
import SelectTextOptions from "./selectTextOptions";

const Options = () => {
  const { t } = useTranslation();

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-purple-200 via-lime-500 to-sky-800 text-white backdrop-blur-sm">
      <div className="flex justify-center">
        <div className="flex flex-col space-y-8 h-full w-[50%] py-24 text-2xl font-semibold overflow-y-auto drop-shadow-l">
          <div className="text-center text-8xl m-24">{t("name")}</div>
          <SelectAi />
          <SelectLanguage />
          <SelectTextOptions />
        </div>
      </div>
      <div className="flex justify-end bottom-0 p-4 cursor-pointer">
        <span
          onClick={() => {
            chrome.tabs.create({ url: "https://github.com/cgarrot" });
          }}
        >
          by @cgarrot
        </span>
      </div>
    </div>
  );
};

export default Options;
