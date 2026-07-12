import { categories, items } from "./data.js";
import {
  canGoToNextCategory,
  nextCategory,
  previousCategory,
  validateCurrentChoice,
} from "./picker.js";
import { gameState, players } from "./state.js";

const playerElement = document.querySelector(".picker-player");
const categoryLabelElement = document.querySelector(".category-label");
const itemsElement = document.querySelector(".picker-items");
const validateButton = document.querySelector(".validate-choice");
const previousCategoryButton = document.querySelector(".previous-category");
const nextCategoryButton = document.querySelector(".next-category");

export const renderPicker = () => {
  const currentPlayer = players[gameState.currentPlayerIndex];
  const currentCategory = categories[gameState.currentCategoryIndex];

  playerElement.textContent = `Joueur ${currentPlayer.id}`;
  categoryLabelElement.textContent = currentCategory.label;

  ((itemsElement.innerHTML = ""),
    currentCategory.items.map((itemId, index) => {
      const selectedItemId = currentPlayer.choices[currentCategory.id];
      const isSelected = itemId == selectedItemId;
      const item = items[itemId];

      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("picker-item");
      if (isSelected) {
        button.classList.add("is-selected");
      }

      button.textContent = item.name;

      if (index === gameState.focusedItemIndex) {
        button.classList.add("is-focused");
      }
      button.addEventListener("click", () => {
        gameState.focusedItemIndex = index;
        renderPicker();
        renderTable();
      });
      itemsElement.append(button);
    }));

  nextCategoryButton.disabled = !canGoToNextCategory();
};

validateButton.addEventListener("click", () => {
  validateCurrentChoice();
  renderPicker();
  renderTable();

  const isLastCategory =
    gameState.currentCategoryIndex === categories.length - 1;

  const isLastPlayer = gameState.currentPlayerIndex === players.length - 1;

  if (isLastCategory && isLastPlayer) {
    validateButton.textContent = "Passer commande";
  } else if (isLastCategory) {
    validateButton.textContent = "Passer au joueur 2";
  } else {
    validateButton.textContent = "Valider";
  }
  console.log(players[0].choices);
});

previousCategoryButton.addEventListener("click", () => {
  previousCategory();
  renderPicker();
});
nextCategoryButton.addEventListener("click", () => {
  nextCategory();
  renderPicker();
});

const sceneWrapper = document.querySelector(".scene-wrapper");

export const renderTable = () => {
  document.querySelectorAll(".food-item").forEach((element) => {
    element.remove();
  });

  players.forEach((player) => {
    Object.entries(player.choices).forEach(([categoryId, itemId]) => {
      createFoodImage({
        player,
        categoryId,
        itemId,
        isPreview: false,
      });
    });
  });

  const currentPlayer = players[gameState.currentPlayerIndex];
  const currentCategory = categories[gameState.currentCategoryIndex];
  const focusedItemId = currentCategory.items[gameState.focusedItemIndex];
  const selectedItemId = currentPlayer.choices[currentCategory.id];

  if (focusedItemId !== selectedItemId) {
    createFoodImage({
      player: currentPlayer,
      categoryId: currentCategory.id,
      itemId: focusedItemId,
      isPreview: true,
    });
  }
  createFoodImage({
    player: currentPlayer,
    categoryId: currentCategory.id,
    itemId: focusedItemId,
    isPreview: true,
  });
};

const createFoodImage = ({ player, categoryId, itemId, isPreview }) => {
  const category = categories.find((category) => category.id === categoryId);

  const item = items[itemId];

  if (!category || !item) {
    return;
  }

  const img = document.createElement("img");

  img.src = `assets/foods/${categoryId}/${item.folder}.png`;
  img.alt = `${item.name} du joueur ${player.id}`;

  img.classList.add(
    "pixel-art",
    "food-item",
    `${categoryId}-${player.id}`,
    item.folder,
  );

  if (isPreview) {
    img.classList.add("is-preview");
  }

  sceneWrapper.append(img);
};
