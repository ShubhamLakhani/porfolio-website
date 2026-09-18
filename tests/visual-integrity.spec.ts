import { expect, test } from "@playwright/test";

test("work text has readable rendered contrast, including expanded stories", async ({ page }) => {
  await page.goto("/#work");
  await page.locator("#orbofi").getByText("Read the project story").click();
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
    const sectionBg = luminance(getComputedStyle(section).backgroundColor);
    const selectors = [
      ".type-section",
      ".type-project",
      ".type-card",
      ".type-prose",
      ".type-marker",
      ".type-caption",
      ".work-serif-accent",
      "strong",
      "a",
      "em",
    ].join(", ");
    return [...section.querySelectorAll<HTMLElement>(selectors)]
      .filter((el) => el.getClientRects().length > 0 && !el.closest("dialog:not([open])"))
      .map((el) => {
        const style = getComputedStyle(el);
        const foreground = luminance(style.color);
        return {
          text: el.textContent?.slice(0, 70),
          opacity: style.opacity,
          ratio: (Math.max(foreground, sectionBg) + 0.05) / (Math.min(foreground, sectionBg) + 0.05),
        };
      });
  });
  expect(results.length).toBeGreaterThan(16);
  for (const result of results) {
    expect(result.opacity, result.text).toBe("1");
    expect(result.ratio, result.text).toBeGreaterThanOrEqual(4.5);
  }

  await page.locator("#orbofi").getByRole("button", { name: "View larger image" }).click();
  const dialogCaption = page.getByRole("dialog").locator(".type-caption");
  await expect(dialogCaption).toHaveCSS("color", "rgb(196, 204, 190)");
  await expect(dialogCaption).toHaveCSS("opacity", "1");
  await page.keyboard.press("Escape");
});

test("work heading accent uses cream on the dark surface", async ({ page }) => {
  await page.goto("/#work");
  const accent = page.locator("#work .work-serif-accent");
  await expect(accent).toHaveCSS("color", "rgb(245, 242, 234)");
  await expect(accent).toHaveCSS("opacity", "1");
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

test("expertise remains an open layout with readable skills and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#expertise");
  const row = page.locator("#expertise article").first();
  await row.hover();
  await expect(row).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(row).toHaveCSS("box-shadow", "none");
  await expect(row.locator("li").first()).toHaveCSS("font-size", "16px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(row).toHaveCSS("transform", "none");
  await expect(row).toHaveCSS("opacity", "1");
});

test("lightbox caption uses the dark surface palette", async ({ page }) => {
  await page.goto("/#orbofi");
  await page.locator("#orbofi").getByRole("button", { name: "View larger image" }).click();
  await expect(page.getByRole("dialog").locator(".type-caption")).toHaveCSS("color", "rgb(196, 204, 190)");
  await page.keyboard.press("Escape");
});

test("mobile work nav underline matches the active project", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#work");
  await page.waitForTimeout(200);
  const active = page.locator("[data-work-nav] a[aria-current='location']");
  await expect(active).toHaveAttribute("data-project-id", "orbofi");
  const underlined = await active.locator(".work-project-nav-label").evaluate((el) => {
    const after = getComputedStyle(el, "::after");
    return after.transform === "none" || after.transform.includes("matrix(1,");
  });
  expect(underlined).toBe(true);

  await page.locator("#happypet").scrollIntoViewIfNeeded();
  await expect
    .poll(async () =>
      page.locator("[data-work-nav] a[aria-current='location']").getAttribute("data-project-id"),
    )
    .toBe("happypet");

  await page.goto("/#orbofi");
  await expect
    .poll(async () =>
      page.locator("[data-work-nav] a[aria-current='location']").getAttribute("data-project-id"),
    )
    .toBe("orbofi");
});

test("experience timeline nodes align to heading first line", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#experience");
  await page.waitForTimeout(300);
  const mismatches = await page.evaluate(() => {
    const items = [...document.querySelectorAll<HTMLElement>(".experience-item")];
    return items.map((item) => {
      const heading = item.querySelector<HTMLElement>(".experience-company");
      const node = item.querySelector<HTMLElement>(".experience-node");
      if (!heading || !node) return 99;
      const headingBox = heading.getBoundingClientRect();
      const style = getComputedStyle(heading);
      const lineHeight = Number.parseFloat(style.lineHeight);
      const firstLineCenter = headingBox.top + lineHeight / 2;
      const nodeBox = node.getBoundingClientRect();
      const nodeCenter = nodeBox.top + nodeBox.height / 2;
      return Math.abs(firstLineCenter - nodeCenter);
    });
  });
  for (const delta of mismatches) expect(delta).toBeLessThanOrEqual(2);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#experience .experience-item").nth(2).scrollIntoViewIfNeeded();
  await expect(page.locator("#experience .experience-item[data-reading='true']")).toHaveCount(1);
});
