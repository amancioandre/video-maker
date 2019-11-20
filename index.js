const readline = require("readline-sync");
const robots = {
  text: require("./robots/text")
};

async function start() {
  const content = {
    maximumSentences: 7
  };

  content.searchTerm = askAndReturnSearchTerm();
  content.prefix = askAndReturnPrefix();

  await robots.text(content);

  function askAndReturnSearchTerm() {
    return readline.question("Type a Wikipedia search term: ");
  }

  function askAndReturnPrefix() {
    const prefixes = ["Who is", "What is", "The history of"];
    return prefixes[readline.keyInSelect(prefixes, "Choose one option: ")];
  }

  console.log(content);
}

start();
