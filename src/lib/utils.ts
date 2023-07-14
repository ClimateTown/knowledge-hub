export const removeWhitespace = (str: string) => {
  return str.replace(/\W+/g, "");
};

export const removeEmojisFromStr = (str: string) => {
  return str.replace(/[\u1000-\uFFFF]+/g, "").trim();
};

export const hasEmoji = (str: string) => {
  return /[\u1000-\uFFFF]+/g.test(str);
};
