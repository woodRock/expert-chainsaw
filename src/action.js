const fetch = require("node-fetch");
const fs = require("fs");
const core = require("@actions/core");

const FILE_NAME = "./README.md";
const ENCODING = "utf8";
const TAG_OPEN = `<!--- FEED-START -->`;
const TAG_CLOSE = `<!--- FEED-END --->`;

async function fetchWeather() {
  const API_KEY = core.getInput("OPEN_WEATHER_TOKEN");
  const city = "Wellington,New Zealand";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&mode=html`;
  const weather = await fetch(URL);
  const weatherText = await articles.text();
  return weatherText;
}

async function run() {
  const readme = fs.readFileSync(FILE_NAME, ENCODING);
  const indexBefore = readme.indexOf(TAG_OPEN) + TAG_OPEN.length;
  const indexAfter = readme.indexOf(TAG_CLOSE);
  const before = readme.substring(0, indexBefore);
  const after = readme.substring(indexAfter);
  const input = fetchWeather();
  const editedReadme = `
    ${before}
    ${input}
    ${after}`;
  fs.writeFileSync(FILE_NAME, editedReadme.trim());
  console.log("before\n" + before);
  console.log("input\n" + input);
  console.log("after\n" + after);
}

try {
  run();
} catch (error) {
  console.log(error);
}
