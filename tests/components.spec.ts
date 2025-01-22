import { test, expect } from '@playwright/test';

test.describe('Region Components', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the page before each test
        await page.goto('/');
        await page.evaluate(() => window.sessionStorage.clear());
    });

    test('should render regions with correct initial state', async ({ page }) => {
        // Check if regions are rendered
        const regions = await page.locator('h2').all();
        expect(regions.length).toBeGreaterThan(0);

        // // Check initial percentage is 0%
        // const percentages = await page.locator('.flex.justify-between').all();
        // for (const percentage of percentages) {
        // const text = await percentage.textContent();
        // expect(text).toContain('0%');
        // }
    });

    // test('should expand/collapse regions and locations', async ({ page }) => {
    //     // Click first region to expand
    //     const firstRegion = await page.locator('h2').first();
    //     await firstRegion.click();
        
    //     // Verify region is expanded
    //     const firstRegionContent = await page.locator('div[role="region"]').first();
    //     expect(await firstRegionContent.isVisible()).toBeTruthy();

    //     // Verify locations are visible
    //     const locations = await page.locator('h3').all();
    //     expect(locations.length).toBeGreaterThan(0);

    //     // Click first location to expand
    //     const firstLocation = locations[0]
    //     await firstLocation.click();
        
    //     // Verify location is expanded
    //     const firstLocationContent = await page.locator('div[role="region"] div[role="region"]').first();
    //     expect(await firstLocationContent.isVisible()).toBeTruthy();

    //     // Click location to close
    //     await firstLocation.click();
    //     await firstLocationContent.waitFor({ state: "hidden" });
        
    //     // Verify first location is now collapsed (accordion behavior)
    //     expect(await firstLocationContent.isVisible()).toBeFalsy();
        
    //     // Click region to close
    //     await firstRegion.click();
    //     await firstRegionContent.waitFor({ state: "hidden" });
        
    //     // Verify first region is now collapsed (accordion behavior)
    //     expect(await firstRegionContent.isVisible()).toBeFalsy();
    // });

    // test('should update checkboxes and percentages correctly', async ({ page }) => {
    //     // Expand first region
    //     await page.locator('h2').first().click();

    //     // Expand first region
    //     await page.locator('h3').first().click();

    //     // Find and click first checkbox
    //     const firstCheckbox = await page.locator('input[type="checkbox"]').first();
    //     await firstCheckbox.click();

    //     // Verify checkbox is checked
    //     expect(await firstCheckbox.isChecked()).toBeTruthy();

    //     // Verify percentage has updated
    //     const percentage = await page.locator('.flex.justify-between').first().textContent();
    //     expect(percentage).not.toBe('0%');
    // });

    // test('should render quests and items correctly', async ({ page }) => {
    //     // Expand first region and location
    //     await page.locator('h2').first().click();
    //     await page.locator('h3').first().click();
    //     const firstLocationContent = await page.locator('div[role="region"] div[role="region"]').first();
    //     await firstLocationContent.waitFor({ state: "visible" });

    //     // Check for quest section
    //     const questSection = await page.locator('h4:text("Quests")').first();
    //     expect(await questSection.isVisible()).toBeTruthy();

    //     // Check for items section
    //     const itemsSection = await page.locator('h4:text("Items")').first();
    //     expect(await itemsSection.isVisible()).toBeTruthy();
    // });

    // test('should maintain checkbox state after collapse/expand', async ({ page }) => {
    //     // Expand first region and location
    //     const firstRegion = await page.locator('h2').first()
    //     const firstLocation = await page.locator('h3').first();
    //     firstRegion.click();
    //     firstLocation.click();

    //     // Click first checkbox
    //     const firstCheckbox = await page.locator('input[type="checkbox"]').first();
    //     await firstCheckbox.click();

    //     // Collapse and re-expand
    //     await firstRegion.click();
    //     await firstRegion.click();

    //     // Verify checkbox state is maintained
    //     const checkbox = await page.locator('input[type="checkbox"]').first();
    //     expect(await checkbox.isChecked()).toBeTruthy();

    //     // Collapse and re-expand
    //     await firstLocation.click();
    //     await firstLocation.click();

    //     // Verify checkbox state is maintained
    //     expect(await checkbox.isChecked()).toBeTruthy();
    // });

    // test('should calculate percentages correctly across regions', async ({ page }) => {
    //     // Expand first region and location
    //     await page.locator('h2').first().click();
    //     const locations = await page.locator('h3:visible').all();
    //     // Click all locations
    //     for (const location of locations) {
    //         await location.click();
    //     }
    //     const firstLocationContent = await page.locator('div[role="region"] div[role="region"]').first();
    //     await firstLocationContent.waitFor({ state: "visible" });

    //     // Get all checkboxes in first region 
    //     const checkboxes = await page.locator('input[type="checkbox"]:visible').all();

    //     // Click all checkboxes
    //     for (const checkbox of checkboxes) {
    //         await checkbox.click();
    //     }

    //     // Verify region shows 100%
    //     const percentage = await page.locator('.flex.justify-between').first().textContent();
    //     expect(percentage).toContain('100%');
    // });
});
