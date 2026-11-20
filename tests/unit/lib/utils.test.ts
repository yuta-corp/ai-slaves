import { describe, expect, it } from "vitest"

import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1")
  })

  it("drops falsy values and dedupes tailwind conflicts", () => {
    expect(cn("px-2", false && "px-4", "px-4")).toBe("px-4")
    expect(cn("px-2", null, undefined)).toBe("px-2")
  })
})
