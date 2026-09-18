import { expect, test } from "@playwright/test";

test("work text has readable rendered contrast, including expanded stories", async ({ page }) => {
  await page.goto("/#work");
  await page.locator("#orbofi").getByText("Behind the build").click();
  const results = await page.locator("#work").evaluate((section) => {
    const luminance = (css: string) => {
      const values = css.match(/[\d.]+/g)?.slice(0, 3).map(Number);
      if (!values || values.length !== 3) throw new Error(`Unsupported computed color: ${css}`);
      const linear = values.map((v) => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    };
    const background = luminance(getComputedStyle(section).backgroundColor);
    return [...section.querySelectorAll<HTMLElement>(".type-section, .type-project, .type-card, .type-prose, .type-marker, .type-caption")]
      .filter((el) => el.getClientRects().length > 0 && !el.closest("dialog:not([open])"))
      .map((el) => {
        const foreground = luminance(getComputedStyle(el).color);
        return {
          text: el.textContent?.slice(0, 70),
          ratio: (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
        };
      });
  });
  expect(results.length).toBeGreaterThan(12);
  for (const result of results) expect(result.ratio, result.text).toBeGreaterThanOrEqual(4.5);
});

test("motion never makes offscreen or onscreen content transparent", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const hidden = await page.locator(".reveal-target").evaluateAll((elements) =>
    elements.filter((el) => {
      const style = getComputedStyle(el);
      return Number(style.opacity) < 1 || style.visibility !== "visible";
    }).length,
  );
  expect(hidden).toBe(0);
  await page.locator("#expertise").scrollIntoViewIfNeeded();
  await expect(page.locator("#expertise article").first()).toHaveCSS("opacity", "1");
});

test("expertise hover works after entrance, with reduced motion respected", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#expertise");
  const card = page.locator("#expertise article").first();
  await card.hover();
  await expect.poll(() => card.evaluate((el) => getComputedStyle(el).transform)).toBe("matrix(1, 0, 0, 1, 0, -4)");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(card).toHaveCSS("transform", "none");
  await expect(card).toHaveCSS("opacity", "1");
});

test("lightbox caption uses the dark surface palette", async ({ page }) => {
  await page.goto("/#orbofi");
  await page.locator("#orbofi").getByRole("button", { name: "View larger image" }).click();
  await expect(page.getByRole("dialog").locator(".type-caption")).toHaveCSS("color", "rgb(196, 204, 190)");
  await page.keyboard.press("Escape");
});
