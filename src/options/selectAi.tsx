import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectType } from "../types/select";
import { apiKeyUrl, listPlatforms } from "../types/platform";
import { googleModels, googleModelsList } from "../prompt/google/const";

export default function SelectAi(): JSX.Element {
  const [platform, setPlatform] = useState<SelectType>({
    value: "",
    label: "",
  });
  const [model, setModel] = useState<SelectType>({
    value: "",
    label: "",
  });
  const [urlApiKeys, setUrlApiKeys] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    chrome.storage.sync.get(["platform", "model", "apiKey"], (result) => {
      if (result.platform === undefined) {
        result.platform = { value: "google", label: "Google" };
      }
      if (result.model === undefined) {
        result.model = {
          value: "gemini-1.5-flash-latest",
          label: "Gemini 1.5 Flash (latest)",
        };
      }
      setApiKey(result.apiKey);
      setPlatform(result.platform);
      setModel(result.model);
      setUrlApiKeys(apiKeyUrl[result.platform]);
    });
  }, []);

  function handleChangeAi(value: SelectType, data: string) {
    chrome.storage.sync.set({ [data]: value });
    if (data === "platform") {
      setPlatform(value);
    } else if (data === "model") {
      setModel(value);
    }
  }

  return (
    <div className="flex flex-col space-y-6 py-6 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5">
      <div className="grid grid-flow-col">
        <div className="flex flex-col px-6">
          <span>{t("options.ai.platform")}</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={t("options.ai.selectPlatform")}
            optionFilterProp="children"
            onChange={(value) => handleChangeAi(value, "platform")}
            value={platform}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={listPlatforms.map((platformElem) => ({
              value: platformElem,
              label: t(`options.ai.platforms.${platformElem}`),
            }))}
          />
        </div>
        <div className="flex flex-col items-end px-6">
          <span>{t("options.ai.model")}</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={t("options.ai.selectModel")}
            optionFilterProp="children"
            onChange={(value) => handleChangeAi(value, "model")}
            value={model}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={googleModels.map((model) => ({
              value: model,
              label: googleModelsList[model],
            }))}
          />
        </div>
      </div>
      <div className="px-6">
        <div className="flex flex-row space-x-3">
          <span>{t("options.ai.apiKey")}</span>
          <span
            onClick={() => {
              chrome.tabs.create({ url: urlApiKeys });
            }}
            className="cursor-pointer flex items-end pb-1 text-sm"
          >{`(${t("options.ai.getApiKey")})`}</span>
        </div>
        <Input.Password
          placeholder={`${t(
            "options.ai.inputApiKey"
          )} - (ex:WjSJdjoWpfnehh23m2jDpfco8k)`}
          status={apiKey === "" ? "error" : ""}
          onChange={(e) => {
            chrome.storage.sync.set({ apiKey: e.target.value });
            setApiKey(e.target.value);
          }}
          value={apiKey}
        />
      </div>
    </div>
  );
}
