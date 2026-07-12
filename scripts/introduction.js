import { renderPicker } from "./render.js";
import { gameState, players } from "./state.js";

const introElement = document.querySelector(".game-intro");
const playerOneInput = document.querySelector(".player-one-name");
const playerTwoInput = document.querySelector(".player-two-name");
const startButton = document.querySelector(".start-game");

export const updateStartButtonState = () => {
  const playerOneName = playerOneInput.value.trim();
  const playerTwoName = playerTwoInput.value.trim();

  startButton.disabled = !playerOneName || !playerTwoName;
};
document.querySelector(".scene-wrapper").inert = true;
document.querySelector(".picker").inert = true;
playerOneInput.addEventListener("input", updateStartButtonState);
playerTwoInput.addEventListener("input", updateStartButtonState);

startButton.addEventListener("click", () => {
  players[0].name = playerOneInput.value.trim();
  players[1].name = playerTwoInput.value.trim();

  introElement.classList.add("is-hidden");
  document.querySelector(".scene-wrapper").inert = false;
  document.querySelector(".picker").inert = false;
  gameState.status = "playing";
  renderPicker();
});
