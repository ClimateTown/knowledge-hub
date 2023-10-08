interface Color {
  name: string
  lightHex: string
  darkHex: string
}

// ! Keep in sync with `data/resource_tags.schema.json` which determines valid colors
let colorData: Color[] = [
  {
    name: "lavender",
    lightHex: "#c8cdea",
    darkHex: "#141a38",
  },
  {
    name: "orange",
    lightHex: "#f1d7c0",
    darkHex: "#3f250e",
  },
  {
    name: "green",
    lightHex: "#e0e9c9",
    darkHex: "#2d3616",
  },
  {
    name: "red",
    lightHex: "#e9cac9",
    darkHex: "#361716",
  },
  {
    name: "teal",
    lightHex: "#cfe2e0",
    darkHex: "#1d302e",
  },
  {
    name: "yellow",
    lightHex: "#efebc2",
    darkHex: "#3c3910",
  },
  {
    name: "purple",
    lightHex: "#dccdea",
    darkHex: "#29183a",
  },
]

// Mappings of human readable color names to hex values for light and dark modes
export let lightColors = colorData.reduce<{ [key: string]: string }>(
  (obj, item: Color) => {
    obj[item.name] = item.lightHex
    return obj
  },
  {}
)

export let darkColors = colorData.reduce<{ [key: string]: string }>(
  (obj, item: Color) => {
    obj[item.name] = item.darkHex
    return obj
  },
  {}
)
