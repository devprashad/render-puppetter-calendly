const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("https://www.google.com");
    await page.screenshot({ path: "google.png" });

    await browser.close();

    res.send("✅ Screenshot of Google taken.");
  } catch (err) {
    console.error("Puppeteer error:", err);
    res.status(500).send("❌ Puppeteer error.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
