import { players, gameState } from "./state.js";
import { categories } from "./data.js";
import { renderFinishedGame } from "./render.js";

export const selectFocusedItem = () => {
  const currentPlayer = players[gameState.currentPlayerIndex];
  const currentCategory = categories[gameState.currentCategoryIndex];
  const focusedItemId = currentCategory.items[gameState.focusedItemIndex];

  currentPlayer.choices[currentCategory.id] = focusedItemId;
};

export const nextItem = () => {
  const focusedItemIndex = gameState.focusedItemIndex;
  const currentCategory = categories[gameState.currentCategoryIndex];

  if (gameState.focusedItemIndex < currentCategory.items.length - 1) {
    gameState.focusedItemIndex++;
  } else {
    gameState.focusedItemIndex = 0;
  }
};

export const previousItem = () => {
  const focusedItemIndex = gameState.focusedItemIndex;
  const currentCategory = categories[gameState.currentCategoryIndex];

  if (focusedItemIndex > 0) {
    gameState.focusedItemIndex--;
  } else {
    gameState.focusedItemIndex = currentCategory.items.length - 1;
  }
};

export const syncFocusedItemWithCurrentChoice = () => {
  const currentPlayer = players[gameState.currentPlayerIndex];
  const currentCategory = categories[gameState.currentCategoryIndex];

  const selectedItemId = currentPlayer.choices[currentCategory.id];
  const selectedItemIndex = currentCategory.items.indexOf(selectedItemId);

  gameState.focusedItemIndex = selectedItemIndex >= 0 ? selectedItemIndex : 0;
};

export const canGoToNextCategory = () => {
  const currentCategory = categories[gameState.currentCategoryIndex];
  const currentPlayer = players[gameState.currentPlayerIndex];

  return currentCategory.id in currentPlayer.choices;
};

export const nextCategory = () => {
  const currentCategory = categories[gameState.currentCategoryIndex];
  const currentPlayer = players[gameState.currentPlayerIndex];

  if (!canGoToNextCategory()) {
    return;
  }

  if (gameState.currentCategoryIndex === categories.length - 1) {
    return;
  }

  gameState.currentCategoryIndex++;
  gameState.focusedItemIndex = 0;

  syncFocusedItemWithCurrentChoice();
};

export const previousCategory = () => {
  if (gameState.currentCategoryIndex === 0) {
    return;
  }
  if (gameState.currentCategoryIndex > 0) {
    gameState.currentCategoryIndex--;
    gameState.focusedItemIndex = 0;
  }

  syncFocusedItemWithCurrentChoice();
};

export const validateCurrentChoice = () => {
  const isLastPlayer = gameState.currentPlayerIndex === players.length - 1;

  const isLastCategory =
    gameState.currentCategoryIndex === categories.length - 1;

  selectFocusedItem();

  if (!isLastCategory) {
    nextCategory();
    return;
  }

  if (!isLastPlayer) {
    gameState.status = "player-transition";
    return;
  }

  gameState.status = "finished";
  renderFinishedGame();
};

export const startNextPlayer = () => {
  if (gameState.status !== "player-transition") {
    return;
  }

  gameState.currentPlayerIndex++;
  gameState.currentCategoryIndex = 0;
  gameState.focusedItemIndex = 0;
  gameState.status = "playing";

  syncFocusedItemWithCurrentChoice();
};
