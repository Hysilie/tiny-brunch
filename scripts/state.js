export const players = [
  {
    id: 1,
    name: "",
    choices: {},
  },
  { id: 2, name: "", choices: {} },
];

/* 
"intro" | "playing" | "player-transition" | "finished"
*/
export const gameState = {
  currentPlayerIndex: 0,
  currentCategoryIndex: 0,
  focusedItemIndex: 0,
  status: "intro",
};
