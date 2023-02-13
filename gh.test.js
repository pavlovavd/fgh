let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent.trim());
    expect(actual).toContain("Get started with Team");
  }, 60000);
});

describe("Github page second tests", () => {

  test("The content of the h1 header on the page Explore", async () => {
    await page.goto("https://github.com/explore");
    const selector = await page.$("a:nth-child(4)");
    await selector.click();
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('Trending repositories on GitHub today · GitHub');
}, 60000);

test("The content of the h1 header on the page Enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('Enterprise · A smarter way to work together · GitHub');
}, 60000);

  test("The title Marketplace content", async () => {
    await page.goto("https://github.com/marketplace");
    const selector = await page.$("div.container-lg.p-responsive.text-center.text-md-left > div > div > a");
    await selector.click();
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('GitHub Marketplace · to improve your workflow · GitHub');
  }, 60000);
});