import { FeatureAi, featuresAi } from "../prompt";
import { selectFeature } from "./logic/features";

chrome.storage.sync.get(
  [
    "emojiSimple",
    "emojiHard",
    "settings",
    "platform",
    "model",
    "abrv",
    "firstLanguage",
    "secondLanguage",
    "apiKey",
  ],
  (result) => {
    if (result.emojiSimple === undefined) {
      chrome.storage.sync.set({ emojiSimple: false });
    }
    if (result.emojiHard === undefined) {
      chrome.storage.sync.set({ emojiHard: false });
    }
    if (result.abrv === undefined) {
      chrome.storage.sync.set({ abrv: null });
    }
    if (result.platform === undefined) {
      chrome.storage.sync.set({
        platform: "google",
      });
    }
    if (result.model === undefined) {
      chrome.storage.sync.set({
        model: "gemini-1.5-flash-latest",
      });
    }
    if (result.settings === undefined) {
      chrome.storage.sync.set({ settings: true });
    }
    if (result.firstLanguage === undefined) {
      chrome.storage.sync.set({ firstLanguage: "english" });
    }
    if (result.secondLanguage === undefined) {
      chrome.storage.sync.set({ secondLanguage: "english" });
    }
    if (result.apiKey === undefined) {
      chrome.runtime.openOptionsPage();
    }
  }
);

chrome.contextMenus.create({
  title: chrome.i18n.getMessage("correctText"),
  id: "correctText",
  contexts: ["all"],
});

chrome.contextMenus.create({
  title: chrome.i18n.getMessage("rephraseText"),
  id: "rephraseText",
  contexts: ["all"],
});

chrome.storage.sync
  .get(["emojiSimple", "emojiHard", "settings"])
  .then((result) => {
    if (result.emojiSimple) {
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage("emojiSimple"),
        id: "emojiSimple",
        contexts: ["all"],
      });
    }
    if (result.emojiHard) {
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage("emojiHard"),
        id: "emojiHard",
        contexts: ["all"],
      });
    }
    if (result.settings) {
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage("settings"),
        id: "settings",
        contexts: ["all"],
      });
    }
  });

chrome.storage.sync.onChanged.addListener((changes) => {
  if (changes.emojiSimple) {
    chrome.contextMenus.remove("emojiSimple");
    if (changes.emojiSimple.newValue.toString() === "true") {
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage("emojiSimple"),
        id: "emojiSimple",
        contexts: ["all"],
      });
    }
  }
  if (changes.emojiHard) {
    chrome.contextMenus.remove("emojiHard");
    if (changes.emojiHard.newValue.toString() === "true") {
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage("emojiHard"),
        id: "emojiHard",
        contexts: ["all"],
      });
    }
  }
  if (changes.settings) {
    chrome.contextMenus.remove("settings");
    if (changes.settings.newValue.toString() === "true") {
      chrome.contextMenus.create({
        title: chrome.i18n.getMessage("settings"),
        id: "settings",
        contexts: ["all"],
      });
    }
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (featuresAi.includes(info.menuItemId as FeatureAi)) {
    chrome.tabs.sendMessage(tab.id, {
      action: "request-ai",
      feature: info.menuItemId,
    });
  }
  if (info.menuItemId === "settings") {
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request-ai") {
    chrome.storage.sync
      .get(["platform", "model", "apiKey", "abrv"])
      .then((result) => {
        if (!result.apiKey) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: chrome.i18n.getMessage("notificationApiKeyTitle"),
            message: chrome.i18n.getMessage("notificationApiKeyMessage"),
          });
        }
        selectFeature(
          message.feature,
          { abrv: result.abrv },
          message.text,
          result.model,
          result.apiKey
        ).then((newText) => {
          sendResponse(newText);
        });
      });
    return true;
  }
  return false;
});
