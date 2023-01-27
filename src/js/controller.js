import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // Polyfill everything except for async/await
import 'regenerator-runtime/runtime'; // Polyfill async/await

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2
// API key - 5bb2f643-2fc0-48d9-b6dc-3d10b21632cc
// 5ed6604591c37cdc054bc886

///////////////////////////////////////


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();
    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering a recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach((event) => {
  window.addEventListener(event, controlRecipes)
})