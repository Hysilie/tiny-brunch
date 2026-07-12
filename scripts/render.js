import { categories, items } from "./data.js";
import {
  canGoToNextCategory,
  nextCategory,
  previousCategory,
  startNextPlayer,
  validateCurrentChoice,
} from "./picker.js";
import { gameState, players } from "./state.js";

const playerElement = document.querySelector(".picker-player");
const categoryLabelElement = document.querySelector(".category-label");
const itemsElement = document.querySelector(".picker-items");
const validateButton = document.querySelector(".validate-choice");
const previousCategoryButton = document.querySelector(".previous-category");
const nextCategoryButton = document.querySelector(".next-category");
const pickerElement = document.querySelector(".picker");
const transitionElement = document.querySelector(".player-transition");
const transitionMessageElement = document.querySelector(".transition-message");
const startNextPlayerButton = document.querySelector(".start-next-player");

export const renderPicker = () => {
  const currentPlayer = players[gameState.currentPlayerIndex];
  const currentCategory = categories[gameState.currentCategoryIndex];

  playerElement.textContent =
    currentPlayer.name || `Joueur ${currentPlayer.id}`;
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
        renderGame();
      });
      itemsElement.append(button);
    }));

  nextCategoryButton.disabled = !canGoToNextCategory();
};

validateButton.addEventListener("click", () => {
  validateCurrentChoice();
  renderGame();

  const isLastCategory =
    gameState.currentCategoryIndex === categories.length - 1;

  const isLastPlayer = gameState.currentPlayerIndex === players.length - 1;

  if (isLastCategory && isLastPlayer) {
    validateButton.textContent = "Passer commande";
  } else {
    validateButton.textContent = "Valider";
  }
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

export const renderPlayerTransition = () => {
  const isTransition = gameState.status === "player-transition";

  transitionElement.hidden = !isTransition;
  pickerElement.hidden = isTransition;

  if (!isTransition) {
    return;
  }

  const finishedPlayer = players[gameState.currentPlayerIndex];

  const nextPlayer = players[gameState.currentPlayerIndex + 1];

  transitionMessageElement.textContent =
    `${finishedPlayer.name} a terminé son brunch ! ` +
    `À ${nextPlayer.name} de jouer.`;
};

export const renderGame = () => {
  renderPicker();
  renderTable();
  renderPlayerTransition();
};

startNextPlayerButton.addEventListener("click", () => {
  startNextPlayer();
  renderGame();
});

const gameFinishedElement = document.querySelector(".game-finished");
const listContainer = document.querySelector(".brunch-list-container");
const sendCommandButton = document.querySelector(".send-command");

export const renderFinishedGame = () => {
  const isGameFinished = gameState.status === "finished";
  gameFinishedElement.classList.remove("is-hidden");

  listContainer.innerHTML = "";
  listContainer.append(...players.map((player) => createListByPlayer(player)));
};

const createListByPlayer = (player) => {
  const playerList = document.createElement("div");
  playerList.classList.add("brunch-list");

  const name = document.createElement("h3");
  name.textContent = player.name || `Joueur ${player.id}`;
  playerList.append(name);

  const ul = document.createElement("ul");

  categories.forEach((category) => {
    const itemId = player.choices[category.id];
    const item = items[itemId];

    if (!item) {
      return;
    }

    const li = document.createElement("li");
    li.textContent = `${category.label} : ${item.name}`;
    ul.append(li);
  });

  playerList.append(ul);

  return playerList;
};

sendCommandButton.addEventListener("click", async () => {
  const commandText = createCommandText();

  try {
    await navigator.clipboard.writeText(commandText);

    sendCommandButton.textContent = "Commande copiée !";

    gameState.currentPlayerIndex = 0;
    gameState.currentCategoryIndex = 0;
    gameState.focusedItemIndex = 0;
    gameState.status = "intro";

    setTimeout(() => {
      sendCommandButton.textContent = "Passer commande";
      renderGame();
    }, 1000);
  } catch (error) {
    console.error("Impossible de copier la commande :", error);
    sendCommandButton.textContent = "Erreur lors de la copie";
  }
});

const createCommandText = () => {
  return players
    .map((player) => {
      const playerName = player.name || `Joueur ${player.id}`;

      const choices = categories
        .map((category) => {
          const itemId = player.choices[category.id];
          const item = items[itemId];

          if (!item) {
            return null;
          }

          return `${category.label} : ${item.name}`;
        })
        .filter(Boolean)
        .join("\n");

      return `${playerName}\n${choices}`;
    })
    .join("\n\n");
};
