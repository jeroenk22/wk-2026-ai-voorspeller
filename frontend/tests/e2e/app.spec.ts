import { expect, test } from "@playwright/test";

test.describe("WK 2026 AI Voorspeller", () => {
  test("startpagina laadt correct", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("WK 2026")).toBeVisible();
    await expect(page.getByText("AI Voorspeller")).toBeVisible();
  });

  test("tab navigatie werkt", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Topscorers/i }).click();
    await expect(page.getByText("Topscorer Advies")).toBeVisible();

    await page.getByRole("button", { name: /Kampioen/i }).click();
    await expect(page.getByText("Wereldkampioen Voorspelling")).toBeVisible();

    await page.getByRole("button", { name: /Poules/i }).click();
    await expect(page.getByText("Poule Voorspellingen")).toBeVisible();
  });

  test("PWA manifest aanwezig", async ({ page }) => {
    await page.goto("/");
    const manifestLink = await page.locator("link[rel='manifest']").getAttribute("href");
    expect(manifestLink).toBeTruthy();
  });
});
