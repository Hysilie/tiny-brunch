import { playMeow1, playMeow2, toggleMusic } from "./sounds.js";
import { animateSprite } from "./animations.js";


// Audio DOM
const audioButton = document.getElementById("audio");
const meow1Button = document.getElementById("meow1");
const meow2Button = document.getElementById("meow2");

// Assets Hot Drinks

const coffeeFrames = [
  "assets/animated/coffee/coffe-cup-dynamic1.png",
  "assets/animated/coffee/coffe-cup-dynamic2.png",
  "assets/animated/coffee/coffe-cup-dynamic3.png",
  "assets/animated/coffee/coffe-cup-dynamic4.png",
  "assets/animated/coffee/coffe-cup-dynamic5.png",
  "assets/animated/coffee/coffe-cup-dynamic6.png",
  "assets/animated/coffee/coffe-cup-dynamic7.png",
  "assets/animated/coffee/coffe-cup-dynamic8.png",
];

const teaFrames = [
  "assets/animated/tea/cup-tea-dynamic1.png",
  "assets/animated/tea/cup-tea-dynamic2.png",
  "assets/animated/tea/cup-tea-dynamic3.png",
  "assets/animated/tea/cup-tea-dynamic4.png",
  "assets/animated/tea/cup-tea-dynamic5.png",
  "assets/animated/tea/cup-tea-dynamic6.png",
  "assets/animated/tea/cup-tea-dynamic7.png",
  "assets/animated/tea/cup-tea-dynamic8.png",
];

export const radioFrames = [
  "assets/animated/radio/radio1.png",
  "assets/animated/radio/radio2.png",
  "assets/animated/radio/radio3.png",
  "assets/animated/radio/radio4.png",
  "assets/animated/radio/radio5.png",
  "assets/animated/radio/radio6.png",
  "assets/animated/radio/radio7.png",
  "assets/animated/radio/radio8.png",
  "assets/animated/radio/radio9.png",
  "assets/animated/radio/radio10.png",
  "assets/animated/radio/radio11.png",
  "assets/animated/radio/radio12.png",
];

const cat1Frames = [
  "assets/animated/cat1/chat1.png",
  "assets/animated/cat1/chat2.png",
  "assets/animated/cat1/chat3.png",
  "assets/animated/cat1/chat4.png",
  "assets/animated/cat1/chat5.png",
  "assets/animated/cat1/chat6.png",
  "assets/animated/cat1/chat7.png",
  "assets/animated/cat1/chat8.png",
  "assets/animated/cat1/chat9.png",
  "assets/animated/cat1/chat10.png",
  "assets/animated/cat1/chat11.png",
  "assets/animated/cat1/chat12.png",
];

const cat2Frames = [
  "assets/animated/cat2/chat2.png",
  "assets/animated/cat2/chat3.png",
  "assets/animated/cat2/chat4.png",
  "assets/animated/cat2/chat5.png",
  "assets/animated/cat2/chat6.png",
  "assets/animated/cat2/chat7.png",
  "assets/animated/cat2/chat8.png",
  "assets/animated/cat2/chat9.png",
  "assets/animated/cat2/chat10.png",
  "assets/animated/cat2/chat11.png",
  "assets/animated/cat2/chat12.png",
  "assets/animated/cat2/chat13.png",
  "assets/animated/cat2/chat14.png",
  "assets/animated/cat2/chat15.png",
  "assets/animated/cat2/chat16.png",
  "assets/animated/cat2/chat17.png",
];

animateSprite("cat1", cat1Frames, 12, 6000);
animateSprite("cat2", cat2Frames, 17, 6000);


audioButton.addEventListener("click", toggleMusic);
meow1Button.addEventListener("click", playMeow1);
meow2Button.addEventListener("click", playMeow2);

/* 
animateSprite("coffee", coffeeFrames, 8);
animateSprite("tea", teaFrames, 8);
animateSprite("radio", radioFrames, 12);

 */