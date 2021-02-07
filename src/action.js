const fetch = require("node-fetch");
const fs = require("fs");

const FILE_NAME = "./README.md";
const ENCODING = "UTF8";
const TAG_OPEN = `<!--- FEED-START -->`;
const TAG_CLOSE = `<!--- FEED-END --->`;

async function run() {
  const readme = fs.readFileSync(FILE_NAME, ENCODING);
  const indexBefore = readme.indexOf(TAG_OPEN) + TAG_OPEN.length;
  const indexAfter = readme.indexOf(TAG_CLOSE);
  const before = readme.substring(0, indexBefore);
  const after = readme.substring(indexAfter);
  const input = "Hello, World!";
  const editedReadme = `
    ${before}
    ${input}
    ${after}`;
  fs.writeFileSync(FILE_NAME, editedReadme.trim());
}

try {
  run();
} catch (error) {
  console.log(error);
}
