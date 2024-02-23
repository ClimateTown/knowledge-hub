import { describe, expect, it } from "vitest"
import { render } from "@testing-library/svelte"

import TagWrapper from "./TagWrapper.svelte"
import { darkColors, lightColors } from "../resources"

describe("TagWrapper", () => {
  it("renders the style css var for light color hex to --tag-color", () => {
    const tagComp = render(TagWrapper, { tagColor: "lavender" })
    const divEl = tagComp.getByTestId("tag-wrapper-component")

    expect(getComputedStyle(divEl).getPropertyValue("--tag-color")).toContain(
      lightColors.lavender
    )
  })

  it("renders the tag-color class for tag colour match found", () => {
    const tagComp = render(TagWrapper, { tagColor: "lavender" })
    const divEl = tagComp.getByTestId("tag-wrapper-component")

    expect(divEl.classList).toContain("tag-color")
  })

  it("renders the style css var for dark color hex to --tag-color-dark", () => {
    const tagComp = render(TagWrapper, { tagColor: "lavender" })
    const divEl = tagComp.getByTestId("tag-wrapper-component")

    expect(
      getComputedStyle(divEl).getPropertyValue("--tag-color-dark")
    ).toContain(darkColors.lavender)
  })

  it("does not add the style css var for colour not in the map", () => {
    const tagComp = render(TagWrapper, { tagColor: "not-real" })
    const divEl = tagComp.getByTestId("tag-wrapper-component")

    expect(getComputedStyle(divEl).getPropertyValue("--tag-color-dark")).toBe(
      ""
    )
  })

  it("does not add the tag-color class for colour not in the map", () => {
    const tagComp = render(TagWrapper, { tagColor: "not-real" })
    const divEl = tagComp.getByTestId("tag-wrapper-component")

    expect(divEl.classList).not.toContain("tag-color")
  })
})
