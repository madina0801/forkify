import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // Polyfill everything except for async/await
import 'regenerator-runtime/runtime'; // Polyfill async/await

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2
// API key - 5bb2f643-2fc0-48d9-b6dc-3d10b21632cc
// 5ed6604591c37cdc054bc886

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0. Update results view to mark selected search results
    resultView.update(model.getSearchResultsPage());

    // 1. Updating a bookmarks view
    bookmarksView.update(model.state.bookmarks);
    
    // 2. Loading recipe
    await model.loadRecipe(id);
    
    // 3. Rendering a recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    // resultView.render(model.getSearchResultsPage());
    resultView.render(model.getSearchResultsPage());

    // 4. Render initial pagination buttons
    paginationView.render(model.state.search);
    // resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 3. Render new results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 4. Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the number of servings (in a state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  // 1. Add / Remove bookmark
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHadlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();