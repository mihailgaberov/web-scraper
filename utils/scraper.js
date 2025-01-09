const MAX_RETRIES = 3;

const validateListing = (listing) => {
  return (
    typeof listing.title === "string" &&
    typeof listing.price === "string" &&
    typeof listing.link === "string"
  );
};

export const scrapeListings = async ({ browser, retryCount }) => {
  try {
    const page = await browser.newPage();

    try {
      await page.goto("https://www.airbnb.com/", { waitUntil: "load" });

      await page.waitForSelector('[itemprop="itemListElement"]', {
        timeout: 10000,
      });

      const listings = await page.$$eval(
        '[itemprop="itemListElement"]',
        (elements) => {
          return elements.slice(0, 10).map((element) => {
            const title =
              element.querySelector(".t1jojoys")?.innerText || "N/A";
            const price =
              element.querySelector("._11jcbg2")?.innerText || "N/A";
            const link = element.querySelector("a")?.href || "N/A";
            return { title, price, link };
          });
        }
      );

      const validListings = listings.filter(validateListing);

      if (validListings.length === 0) {
        throw new Error("No listings found");
      }

      return validListings;
    } catch (pageError) {
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        return await scrapeListings(retryCount + 1);
      } else {
        throw new Error(
          `Failed to scrape data after ${MAX_RETRIES} attempts: ${pageError.message}`
        );
      }
    } finally {
      await page.close();
    }
  } catch (browserError) {
    throw new Error(`Failed to launch browser: ${browserError.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
