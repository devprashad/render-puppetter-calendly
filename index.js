const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: puppeteer.executablePath(),
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    await page.screenshot({ path: "google.png" });

    await browser.close();

    res.send("✅ Screenshot of google.com taken successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error launching Puppeteer");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
