const puppeteer = require("puppeteer");
let readlineSync = require("readline-sync");
let fs = require("fs");

(async () => {
  let url = readlineSync.question("Enter the fan site url: ");

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  let data = await page.evaluate(() => {
    let nav = document.querySelector("nav") ? true : false;
    let a = document.querySelector("a") ? true : false;
    let h1 = document.querySelector("h1") ? true : false;
    let h2 = document.querySelector("h2") ? true : false;
    let h3 = document.querySelector("h3") ? true : false;
    let p = document.querySelector("p") ? true : false;
    let img = document.querySelector("img") ? true : false;
    let li = document.querySelector("li") ? true : false;
    let ul = document.querySelector("ul") ? true : false;
    let body = document.body;

    let backgroundColor = window
      .getComputedStyle(body, null)
      .getPropertyValue("background-color");
    let margin = window.getComputedStyle(body, null).getPropertyValue("margin");
    let image = document.getElementsByClassName("styled-img");
    let border = window
      .getComputedStyle(image[0], null)
      .getPropertyValue("border");
    let fontFamily = window
      .getComputedStyle(body, null)
      .getPropertyValue("font-family");
    let h1El = document.querySelector("h1");
    let color = window.getComputedStyle(h1El, null).getPropertyValue("color");
    let fontSize = window
      .getComputedStyle(h1El, null)
      .getPropertyValue("font-size");

    return {
      nav,
      a,
      h1,
      h2,
      h3,
      p,
      img,
      li,
      ul,
      backgroundColor,
      margin,
      border,
      fontFamily,
      color,
      fontSize,
    };
  });

  console.log(data);

  debugger;
  await browser.close();
  fs.writeFile("fansite.json", JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log("File Saved!");
  });
  console.log("Browser Closed!");
})();
