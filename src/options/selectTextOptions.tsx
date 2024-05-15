import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SelectTextOptions(): JSX.Element {
  const { t } = useTranslation();
  const [abrv, setAbrv] = useState<boolean | null>(null);
  const [emojiSimple, setEmojiSimple] = useState<boolean>(false);
  const [emojiHard, setEmojiHard] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.sync.get(
      ["abrv", "emojiSimple", "emojiHard", "settings"],
      (result) => {
        setAbrv(result.abrv);
        setEmojiSimple(result.emojiSimple);
        setEmojiHard(result.emojiHard);
        setSettings(result.settings);
      }
    );
  }, []);

  return (
    <div className="flex flex-col space-y-4 justify-center py-6 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
      <div className="flex flex-wrap justify-between px-6">
        <span>{t("options.abrv.title")}</span>
        <div className="flex justify-center w-full">
          <Radio.Group
            value={abrv}
            onChange={(e) => {
              chrome.storage.sync.set({ abrv: e.target.value });
              setAbrv(e.target.value);
            }}
          >
            <Radio.Button value={true}>{t("options.abrv.yes")}</Radio.Button>
            <Radio.Button value={false}>{t("options.abrv.no")}</Radio.Button>
            <Radio.Button value={null}>{t("options.abrv.idk")}</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="flex flex-row justify-between px-6">
        <span>{t("options.emoji.titleSimple")}</span>
        <Radio.Group
          value={emojiSimple}
          onChange={(e) => {
            chrome.storage.sync.set({ emojiSimple: e.target.value });
            setEmojiSimple(e.target.value);
          }}
        >
          <Radio.Button value={true}>{t("yes")}</Radio.Button>
          <Radio.Button value={false}>{t("no")}</Radio.Button>
        </Radio.Group>
      </div>
      <div className="flex flex-row justify-between px-6">
        <span>{t("options.emoji.titleHard")}</span>
        <Radio.Group
          value={emojiHard}
          onChange={(e) => {
            chrome.storage.sync.set({ emojiHard: e.target.value });
            setEmojiHard(e.target.value);
          }}
        >
          <Radio.Button value={true}>{t("yes")}</Radio.Button>
          <Radio.Button value={false}>{t("no")}</Radio.Button>
        </Radio.Group>
      </div>
      <div className="flex flex-row justify-between px-6">
        <span>{t("options.settings.title")}</span>
        <Radio.Group
          value={settings}
          onChange={(e) => {
            chrome.storage.sync.set({ settings: e.target.value });
            setSettings(e.target.value);
          }}
        >
          <Radio.Button value={true}>{t("yes")}</Radio.Button>
          <Radio.Button value={false}>{t("no")}</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
}
