import { TransitionRequestAiContent } from "../types/requestAi";

chrome.runtime.onMessage.addListener((message: TransitionRequestAiContent) => {
  if (message.action === "request-ai") {
    const selection = document.getSelection();
    if (selection) {
      chrome.runtime.sendMessage(
        {
          action: message.action,
          feature: message.feature,
          text: selection.toString(),
        },
        (newText) => {
          document.execCommand(
            "insertText",
            false,
            newText.substring(0, newText.length - 2)
          );
        }
      );
    }
  }
});
