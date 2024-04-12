import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link",{name: "Sign In"}).click();
 
    await expect(page.getByRole("heading", {name:"Sign In"})).toBeVisible();
 
    await page.locator("[name=email]").fill("anuj9111@gmail.com");
    await page.locator("[name=password]").fill("Anuj@123");
 
    await page.getByRole("button",{name:"Login"}).click();
 
    await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page })=>{
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]',"3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files", "1.png"),
        // path.join(__dirname, "files", "2.png"),
    ]);

    await page.getByRole("button",{name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible({ timeout: 10000 });
});

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);
   
    await expect(page.locator('//h2[text()="aman"]')).toBeVisible();
    // await expect(page.getByText('aman')).toBeVisible();
    await expect(page.getByText("amankgkgfkdfb")).toBeVisible();
    
    // await expect(page.getByText("satna,india")).toBeVisible();
    await expect(page.getByText("Golf Resort")).toBeVisible();
    await expect(page.getByText("1199 per night")).toBeVisible();
    await expect(page.getByText("1 adults, 0 children")).toBeVisible();
    await expect(page.getByText("3 Star Rating")).toBeVisible();
  
    await expect(
      page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  });