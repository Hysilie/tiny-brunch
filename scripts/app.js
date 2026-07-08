import { playMeow1, playMeow2, toggleMusic } from "./sounds.js";
import { animateSprie } from "./animations.js";

const welcome = document.getElementById("welcome");

welcome.addEventListener("click", function () {
  console.log("Yuuummy 😋");
});

// Audio DOM
const audioButton = document.getElementById("audio");
const meow1Button = document.getElementById("meow1");
const meow2Button = document.getElementById("meow2");

audioButton.addEventListener("click", toggleMusic);
meow1Button.addEventListener("click", playMeow1);
meow1Button.addEventListener("click", playMeow2);

// Assets Hot Drinks

const coffeeFrames = [
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic1.png",
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic2.png",
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic3.png",
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic4.png",
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic5.png",
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic6.png",
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic7.png",
  "assets/foods/hot-drinks/coffee/dynamic/coffe-cup-dynamic8.png",
];

const teaFrames = [
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic1.png",
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic2.png",
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic3.png",
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic4.png",
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic5.png",
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic6.png",
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic7.png",
  "assets/foods/hot-drinks/tea/dynamic/cup-tea-dynamic8.png",
];

animateSprie("coffee", coffeeFrames, 8);
animateSprie("tea", teaFrames, 8);
