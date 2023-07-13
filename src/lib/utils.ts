export let removeWhitespace = (str: string) => {
  return str.replace(/\W+/g, "");
};