import { animateSprite, stopAnimate } from "./animations.js";
import { radioFrames } from "./app.js";
// Music
const backgroundMusic = new Audio("assets/music/Hazelwood - At Ease.mp3");
const meow1 = new Audio("assets/sounds/meow1.mp3");
const meow2 = new Audio("assets/sounds/meow2.mp3");
const cassetteInsert = new Audio("assets/sounds/cassette_insert.mp3");
const cassetteEject = new Audio("assets/sounds/cassette-eject.mp3");

const radioButton = document.getElementById("audio");

let radioInterval = null;
let isOn = false;

export const toggleMusic = () => {
  if (!isOn) {
    isOn = true;
    radioButton.classList.add("locked");
    cassetteInsert.play();
    cassetteInsert.onended = () => {
      backgroundMusic.play();
      radioButton.classList.remove("locked");
    };
    radioInterval = animateSprite('radio', radioFrames, 12);
  } else {
    isOn = false;
    cassetteEject.play();
    backgroundMusic.pause();
    stopAnimate(radioInterval, "radio", "assets/animated/radio1.png");
  }
};

export const playMeow1 = () => meow1.play();
export const playMeow2 = () => meow2.play();
