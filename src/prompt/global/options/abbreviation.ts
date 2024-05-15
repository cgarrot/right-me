export const abrvOn = `You will prefer use abbreviation in the text. (ex: "I am" -> "I'm", "as soon as possible" -> "asap")`;

export const abrvOff = `You will prefer use full words in the text. (ex: "I'm" -> "I am", "asap" -> "as soon as possible")`;

export function abvrToText(abvrValue: boolean | null): string {
  if (abvrValue === true) {
    return abrvOn;
  } else if (abvrValue === false) {
    return abrvOff;
  } else {
    return "I don't know";
  }
}
