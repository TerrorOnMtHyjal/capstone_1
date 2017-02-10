const URL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const API_KEY = "AIzaSyAoq2H7SrmQO7EeyXNvdwYWXHYYM4Xh0Ms";
const appState = {
  cachedFonts: [],
  currentHeaderFont: "",
  currentParagraphFont: "",
  currentWebFontConfig: {}
};

function getData() {
  const query = {
    sort: "popularity"
  };
  $.getJSON(URL, query, handleResponseData);
}

function updateWebFontConfig(state) {
  return webFontConfig = {
    google: {
      families: [state.currentHeaderFont, state.currentParagraphFont]
    },
    loading: function () {},
    active: function () {},
    inactive: function () {},
    fontloading: function (familyName, fvd) {},
    fontactive: function (familyName, fvd) {renderPage(state);},
    fontinactive: function (familyName, fvd) {}
  };
}

function handleResponseData({items}) {
  cacheFonts(items, appState.cachedFonts);
}

function cacheFonts(fonts, cachedFonts) {
  //display, serif, sans-serif, handwriting, monospace
  $.each(fonts, function (_index, {family, category, variants}) {
    console.log(category);
  });
}

function renderPage(state) {
  updateExampleElements(state);
}

function updateExampleElements({currentHeaderFont, currentParagraphFont}) {
  $('#js-genHeader').css("font-family", currentHeaderFont);
  $('#js-genParagraph').css("font-family", currentParagraphFont);
}

function updateFonts(state) {
  var newRandomIndex = () => Math.floor(Math.random() * state.cachedFonts.length);
  state.currentHeaderFont = state.cachedFonts[newRandomIndex()].family;
  state.currentParagraphFont = state.cachedFonts[newRandomIndex()].family;
}

function initializeClickHandlers() {
  $('#js-container').on("click", "#js-randomizeBtn", function () {
    updateFonts(appState);
    WebFont.load(updateWebFontConfig(appState));
  });
}

$(function () {
  getData();
  initializeClickHandlers();
});