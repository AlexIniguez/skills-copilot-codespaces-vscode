//Create a web browser
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();
//Go to the page
await page.goto('https://www.instagram.com/p/CHH3lZ2lY5b/');

//Wait for the comments to load
await page.waitForSelector('div.C4VMK span');

//Get the comments
const comments = await page.$$eval('div.C4VMK span', links => {
  //Make sure the comment is not empty
  links = links.filter(link => link.innerText.trim());
  //Extract the username and comment text
  links = links.map(el => el.innerText.split('\n'));
  //Return the results
  return links;
});
//Output the comments to the console
console.log(comments);
//Close the browser
await browser.close();
