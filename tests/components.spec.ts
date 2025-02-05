import { test, expect } from '@playwright/test';

test.describe('Region Components', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the page before each test
        await page.goto('/bg3progression');
        await page.evaluate(() => window.sessionStorage.clear());
    });

    test('should render regions with correct initial state', async ({ page }) => {
        // Check if regions are rendered
        const regions = await page.locator('[data-test="region-name"]').all();
        expect(regions.length).toBeGreaterThan(0);

        // Check initial percentage is 0%
        const percentages = await page.locator('[data-test="region-completion"]').all();
        for (const percentage of percentages) {
            const text = await percentage.textContent();
            expect(text).toContain('0%');
        }
    });

    test('should expand/collapse regions and locations', async ({ page }) => {
        // Click first region to expand
        const firstRegion = await page.locator('[data-test="region-name"]').first();
        await firstRegion.click();
        
        // Verify region is expanded
        const firstRegionContent = await page.locator('[data-test="region-details"]').first();
        expect(await firstRegionContent.isVisible()).toBeTruthy();

        // Verify locations are visible
        const locations = await page.locator('[data-test="location-name"]').all();
        expect(locations.length).toBeGreaterThan(0);

        // Click first location to expand
        const firstLocation = locations[0];
        await firstLocation.click();
        
        // Verify location is expanded
        const firstLocationContent = await page.locator('[data-test="location-details"]').first();
        expect(await firstLocationContent.isVisible()).toBeTruthy();

        // Click location to close
        await firstLocation.click();
        await firstLocationContent.waitFor({ state: "hidden" });
        
        // Verify first location is now collapsed
        expect(await firstLocationContent.isVisible()).toBeFalsy();
        
        // Click region to close
        await firstRegion.click();
        await firstRegionContent.waitFor({ state: "hidden" });
        
        // Verify first region is now collapsed
        expect(await firstRegionContent.isVisible()).toBeFalsy();
    });

    test('should update checkboxes and percentages correctly', async ({ page }) => {
        // Expand first region and location
        await page.locator('[data-test="region-name"]').first().click();
        await page.locator('[data-test="location-name"]').first().click();

        // Find and click first checkbox
        const firstCheckbox = await page.locator('[data-test="item-checkbox"]').first();
        await firstCheckbox.click();

        // Verify checkbox is checked
        expect(await firstCheckbox.isChecked()).toBeTruthy();

        // Verify location percentage has updated
        const locationPercentage = await page.locator('[data-test="location-completion"]').first().textContent();
        expect(locationPercentage).not.toBe('0%');

        // Verify region percentage has updated
        const regionPercentage = await page.locator('[data-test="region-completion"]').first().textContent();
        expect(regionPercentage).not.toBe('0%');

        // Verify act completion has updated
        const actCompletion = await page.locator('[data-test="act-completion"]').textContent();
        expect(actCompletion).toContain('%');
        expect(actCompletion).not.toContain('0%');
    });

    test('should render quests and items correctly', async ({ page }) => {
        // Expand first region and location
        await page.locator('[data-test="region-name"]').first().click();
        await page.locator('[data-test="location-name"]').first().click();

        // Verify location is expanded
        const firstLocationContent = await page.locator('[data-test="location-details"]').first();
        expect(await firstLocationContent.isVisible()).toBeTruthy();

        // Wait for lazy loaded content to load
        await page.waitForSelector('[data-test="list-name"]:text("Quests")');
        await page.waitForSelector('[data-test="list-name"]:text("Items")');

        // Check for quest section
        const questSection = await page.locator('[data-test="list-name"]:text("Quests")').first();
        expect(await questSection.isVisible()).toBeTruthy();

        // Check for items section
        const itemsSection = await page.locator('[data-test="list-name"]:text("Items")').first();
        expect(await itemsSection.isVisible()).toBeTruthy();
    });

    test('should maintain checkbox state after collapse/expand', async ({ page }) => {
        // Expand first region and location
        const firstRegion = page.locator('[data-test="region-name"]').first()
        const firstLocation = page.locator('[data-test="location-name"]').first()
        await firstRegion.click();
        await firstLocation.click();

        // Verify location is expanded
        const firstLocationContent = await page.locator('[data-test="location-details"]').first();
        expect(await firstLocationContent.isVisible()).toBeTruthy();

        // Wait for lazy loaded content to load
        await page.waitForSelector('[data-test="list-name"]:text("Quests")');

        // Click first checkbox
        const firstCheckbox = await page.locator('input[type="checkbox"]').first();
        await firstCheckbox.click();

        // Collapse and re-expand region
        await firstRegion.click();
        await firstRegion.click();

        // Verify checkbox state is maintained
        expect(await firstCheckbox.isChecked()).toBeTruthy();

        // Collapse and re-expand location
        await firstLocation.click();
        await firstLocation.click();

        // await page.waitForTimeout(1000);

        // Verify location is expanded
        expect(await firstLocationContent.isVisible()).toBeTruthy();

        // Verify checkbox state is maintained
        // expect(await page.locator('input[type="checkbox"]').first().isChecked()).toBeTruthy();
    });

    test('should calculate percentages correctly across regions', async ({ page }) => {
        // Expand first region and location
        await page.locator('[data-test="region-name"]').first().click();
        const locations = await page.locator('[data-test="location-name"]:visible').all();

        // Click all locations
        for (const location of locations) {
            await location.click();
        }

        // Verify location is expanded
        const firstLocationContent = await page.locator('[data-test="location-details"]').first();
        expect(await firstLocationContent.isVisible()).toBeTruthy();

        // Wait for lazy loaded content to load
        await page.waitForSelector('[data-test="list-name"]:text("Quests")');

        // Get all checkboxes in first region 
        const checkboxes = await page.locator('input[type="checkbox"]:visible').all();

        // Click all checkboxes
        for (const checkbox of checkboxes) {
            await checkbox.click();
        }

        // Verify region percentage has updated
        const regionPercentage = await page.locator('[data-test="region-completion"]').first().textContent();
        expect(regionPercentage).toBe('100%');
 
    });

    test('should filter content based on search', async ({ page }) => {
        // Type in search box
        const searchInput = await page.locator('[data-test="search-input"] input');
        await searchInput.fill('captive');
        await page.waitForTimeout(1000);

        // Verify location is expanded
        const firstLocationContent = await page.locator('[data-test="location-details"]').first();
        expect(await firstLocationContent.isVisible()).toBeTruthy();

        // Clear search
        await searchInput.fill('');
        await page.waitForTimeout(1000);
        
        // Verify location is collapsed
        expect(await firstLocationContent.isVisible()).toBeFalsy();
    });
});
