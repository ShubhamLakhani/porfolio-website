import { expect, test } from "@playwright/test";
import { expertiseCards } from "../src/content/skills";
import { siteMeta } from "../src/content/site";

test.describe("portfolio smoke", () => {
  test("approach stages remain interactive", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "production.",
    );

    const stageGroup = page.getByRole("group", {
      name: "Explore my approach",
    });
    await stageGroup.getByRole("button", { name: /Stage 02: Shape/ }).click();
    await expect(
      page.getByRole("heading", { name: "Make the complex feel simple." }),
    ).toBeVisible();
    await stageGroup.getByRole("button", { name: /Stage 03: Build/ }).click();
    await expect(
      page.getByRole("heading", { name: "Build the complete application." }),
    ).toBeVisible();
    await stageGroup.getByRole("button", { name: /Stage 04: Run/ }).click();
    await expect(
      page.getByRole("heading", { name: "Care beyond the launch." }),
    ).toBeVisible();
    await stageGroup
      .getByRole("button", { name: /Stage 01: Understand/ })
      .click();
    await expect(
      page.getByRole("heading", { name: "Start with the problem." }),
    ).toBeVisible();
  });

  test("mobile menu disclosure, keyboard, and breakpoint reset", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.locator("header button[aria-controls]");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Open menu");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Close menu");

    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);

    await page.keyboard.press("Tab");
    await expect(mobileNav.getByRole("link", { name: "Work" })).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(toggle).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Open menu");
    await expect(toggle).toBeFocused();
    await expect(mobileNav).toBeHidden();

    await toggle.click();
    await expect(mobileNav).toBeVisible();
    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(toggle).toBeHidden();
    await expect(mobileNav).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    const scrollLocked = await page.evaluate(
      () => document.body.style.overflow === "hidden",
    );
    expect(scrollLocked).toBe(false);
    await page.evaluate(() => window.scrollTo(0, 400));
    await expect
      .poll(async () => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(100);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Open menu");
    await expect(mobileNav).toBeHidden();
  });

  test("sticky header leaves section destinations visible", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Portfolio navigation" })
      .getByRole("link", { name: "Work" })
      .click();

    await expect
      .poll(async () =>
        page.evaluate(() => {
          const header = document.querySelector("header");
          const work = document.querySelector("#work");
          if (!header || !work) return null;
          return work.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
        }),
      )
      .toBeGreaterThanOrEqual(-2);
  });

  test("direct expertise hash clears sticky header", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#expertise");
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const header = document.querySelector("header");
          const heading = document.querySelector("#expertise h2");
          if (!header || !heading) return null;
          return (
            heading.getBoundingClientRect().top -
            header.getBoundingClientRect().bottom
          );
        }),
      )
      .toBeGreaterThanOrEqual(-2);
    await expect(page.locator("#expertise h2")).toBeVisible();
  });

  test("gallery lightbox focus cycle, arrows, and single-image project", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const orbofi = page.locator("#orbofi");
    await orbofi.scrollIntoViewIfNeeded();
    const openLarger = orbofi.getByRole("button", { name: "View larger image" });
    await openLarger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toContainText("Orbofi: Image 1 of 2");
    await expect(dialog.getByRole("button", { name: "Close image" })).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByRole("heading")).toContainText("Orbofi: Image 2 of 2");
    await page.keyboard.press("ArrowLeft");
    await expect(dialog.getByRole("heading")).toContainText("Orbofi: Image 1 of 2");

    await page.keyboard.press("Tab");
    await expect(
      dialog.getByRole("button", { name: "Previous image" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("button", { name: "Next image" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("button", { name: "Close image" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(openLarger).toBeFocused();

    const accelevents = page.locator("#accelevents");
    await accelevents.scrollIntoViewIfNeeded();
    await expect(
      accelevents.getByRole("group", { name: /images/i }),
    ).toHaveCount(0);
    const aceOpen = accelevents.getByRole("button", { name: "View larger image" });
    await aceOpen.click();
    const aceDialog = accelevents.getByRole("dialog");
    await expect(aceDialog).toBeVisible();
    await expect(
      aceDialog.getByRole("button", { name: "Previous image" }),
    ).toHaveCount(0);
    await aceDialog.getByRole("button", { name: "Close image" }).click();
    await expect(aceDialog).toBeHidden();
    await expect(aceOpen).toBeFocused();
  });

  test("copy email success writes the exact address", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    const copyButton = page.getByRole("button", { name: "Copy email" });
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    await expect(page.getByRole("status")).toHaveText("Email copied.");
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe(siteMeta.email);
  });

  test("copy email failure shows fallback feedback", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: () => Promise.reject(new Error("denied")),
        },
      });
    });
    await page.getByRole("button", { name: "Copy email" }).click();
    await expect(page.getByRole("status")).toHaveText(
      "Please copy the email address above.",
    );
  });

  test("resume PDF responds and download works", async ({ page, request }) => {
    await page.goto("/");
    const response = await request.get("/resume/Shubham_Lakhani_Resume.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"] ?? "").toMatch(/pdf|octet-stream/i);
    const body = await response.body();
    expect(body.subarray(0, 5).toString("utf8")).toBe("%PDF-");

    const downloadPromise = page.waitForEvent("download");
    await page
      .locator("#contact")
      .getByRole("link", { name: "Download resume" })
      .click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("Shubham_Lakhani_Resume.pdf");
  });

  test("expertise rows keep every skill with icon and learning separation", async ({
    page,
  }) => {
    await page.goto("/#expertise");
    const section = page.locator("#expertise");
    await expect(section.getByText("Learning", { exact: true })).toBeVisible();
    await expect(
      section.getByRole("heading", { name: "Currently learning" }),
    ).toBeVisible();

    for (const card of expertiseCards) {
      await expect(
        section.getByRole("heading", { name: card.title }),
      ).toBeVisible();
      for (const item of card.items) {
        const skill = section.getByText(item.label, { exact: true });
        await expect(skill).toBeVisible();
        const hasIcon = await skill.evaluate((node) => {
          const li = node.closest("li");
          return Boolean(li?.querySelector("svg"));
        });
        expect(hasIcon, `${item.label} missing icon`).toBe(true);
      }
    }
  });

  test("public copy has no em dashes", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").innerText();
    expect(text).not.toContain("—");
    const title = await page.title();
    expect(title).not.toContain("—");
  });

  test("project story expansion remains available", async ({ page }) => {
    await page.goto("/");
    const orbofi = page.locator("#orbofi");
    await orbofi.getByText("Read the project story").click();
    await expect(
      orbofi.getByRole("heading", { name: "The product", exact: true }),
    ).toBeVisible();
    await expect(
      orbofi.getByText(/moved the frontend to Remix/i),
    ).toBeVisible();
  });

  test("no horizontal overflow at common widths", async ({ page }) => {
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.locator("#orbofi").getByText("Read the project story").click();
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 1;
      });
      expect(overflow, `overflow at ${width}px`).toBe(false);
    }
  });

  test("reduced motion keeps content readable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: /Stage 03: Build/ }).click();
    await expect(
      page.getByRole("heading", { name: "Build the complete application." }),
    ).toBeVisible();
    await expect(page.locator("#expertise")).toBeVisible();
    const hiddenReveal = await page.evaluate(() =>
      [...document.querySelectorAll(".reveal-target")].some((el) => {
        const style = getComputedStyle(el);
        return style.opacity === "0" || style.visibility === "hidden";
      }),
    );
    expect(hiddenReveal).toBe(false);
  });

  test("content remains available with javascript disabled", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(baseURL ?? "/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "production.",
    );
    await expect(page.locator("#expertise")).toBeVisible();
    await expect(page.getByText("React", { exact: true }).first()).toBeVisible();
    await context.close();
  });

  test("project image preview and text trigger restore focus after dialog", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#orbofi");
    const orbofi = page.locator("#orbofi");
    const preview = orbofi.getByRole("button", {
      name: /View larger project image/i,
    });
    await preview.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(preview).toBeFocused();

    const textTrigger = orbofi.getByRole("button", { name: "View larger image" });
    await textTrigger.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Close image" }).click();
    await expect(dialog).toBeHidden();
    await expect(textTrigger).toBeFocused();
  });

  test("project story disclosure survives rapid toggles", async ({ page }) => {
    await page.goto("/#orbofi");
    const orbofi = page.locator("#orbofi");
    const summary = orbofi.getByText("Read the project story");
    await summary.click();
    await summary.click();
    await summary.click();
    await expect(
      orbofi.getByRole("heading", { name: "The product", exact: true }),
    ).toBeVisible();
    await expect(
      orbofi.getByText(/moved the frontend to Remix/i),
    ).toBeVisible();
  });

  test("work project anchors clear sticky chrome", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#noteefy");
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const heading = document.querySelector("#noteefy h3");
          const header = document.querySelector("header");
          const nav = document.querySelector("[data-work-nav]");
          if (!heading || !header) return false;
          const top = heading.getBoundingClientRect().top;
          const clearance =
            header.getBoundingClientRect().bottom +
            (nav?.getBoundingClientRect().height ?? 0) +
            4;
          return top >= clearance - 1;
        });
      })
      .toBe(true);
  });
});
