import { afterEach, describe, expect, it } from "vitest"

const canConnect = Boolean(process.env.DATABASE_URL)

describe.skipIf(!canConnect)("prisma", () => {
  const email = `test-${Date.now()}@example.com`

  afterEach(async () => {
    const { prisma } = await import("@/lib/prisma")
    await prisma.user.deleteMany({ where: { email } })
  })

  it("creates, reads and deletes a user", async () => {
    const { prisma } = await import("@/lib/prisma")

    const created = await prisma.user.create({
      data: { email, name: "Test User" },
    })
    const found = await prisma.user.findUnique({ where: { email } })

    expect(found?.id).toBe(created.id)

    await prisma.user.delete({ where: { id: created.id } })
    expect(await prisma.user.findUnique({ where: { email } })).toBeNull()
  }, 15_000)
})
