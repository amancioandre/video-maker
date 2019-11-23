const { google } = require("googleapis");
const customSearch = google.customsearch("v1");
const state = require("./state");

const { apiKey, searchEngineId } = require("../credentials/google-search.json");

async function robot() {
  const content = state.load();

  await fetchImagesOfAllSentences(content);
  state.save(content);

  async function fetchImagesOfAllSentences(content) {
    for (const sentence of content.sentences) {
      const query = `${content.searchTerm} ${sentence.keywords[0]}`;
      sentence.images = await fetchGoogleAndReturnImageLinks(query);

      sentence.googleSearchQuery = query;
    }
  }

  async function fetchGoogleAndReturnImageLinks(query) {
    const response = await customSearch.cse.list({
      auth: apiKey,
      cx: searchEngineId,
      q: query,
      searchType: "image",
      imgSize: "huge",
      num: 2
    });

    return response.data.items.map(item => item.link);
  }
}

module.exports = robot;
