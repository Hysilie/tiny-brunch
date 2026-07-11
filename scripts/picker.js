import { players, gameState } from "./state.js";
import { categories, items } from "./data.js";

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

export const nextCategory = () => {
  if (gameState.currentCategoryIndex === categories.length - 1) {
    return;
  }
  if (gameState.currentCategoryIndex < categories.length - 1) {
    gameState.currentCategoryIndex++;
    gameState.focusedItemIndex = 0;
  }
};

export const previousCategory = () => {
  if (gameState.currentCategoryIndex === 0) {
    return;
  }
  if (gameState.currentCategoryIndex > 0) {
    gameState.currentCategoryIndex--;
    gameState.focusedItemIndex = 0;
  }
};

export const validateCurrentChoice = () => {
    const isLastPlayer = gameState.currentPlayerIndex === 1
    const isLastCategory = gameState.currentCategoryIndex === categories.length - 1
    selectFocusedItem() 
    if (isLastCategory && isLastPlayer) console.log('Victory')
    if (!isLastCategory) nextCategory()
    if (isLastCategory && !isLastPlayer) {
        gameState.currentPlayerIndex++
        gameState.currentCategoryIndex = 0;
        gameState.focusedItemIndex = 0
    }
}

validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
validateCurrentChoice()
console.log('Player 1  : ', players[0].choices, '\nPlayer 2:', players[1].choices)
