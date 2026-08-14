const {createRequire} = require('module');
const path = require('path');
const r = createRequire('C:/Users/josep/Claude Gravity/mabrey-roofing/package.json');
const {chromium} = r('playwright');

(async () => {
  const file = 'file:///' + path.resolve(__dirname, 'out/storyboard.html').split(path.sep).join('/');
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 1900, height: 1400}, deviceScaleFactor: 1.4});
  await p.goto(file);
  await p.waitForTimeout(1500);
  await p.screenshot({path: path.resolve(__dirname, 'out/STORYBOARD.png'), fullPage: true});
  await b.close();
  console.log('storyboard shot');
})();
