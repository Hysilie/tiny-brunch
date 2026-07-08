// Music
const backgroundMusic = new Audio("assets/music/Hazelwood - At Ease.mp3");
const meow1 = new Audio("assets/sounds/meow1.mp3");
const meow2 = new Audio("assets/sounds/meow2.mp3");
const cassetteInsert = new Audio("assets/sounds/cassette_insert.mp3");
const cassetteEject = new Audio("assets/sounds/cassette-eject.mp3");

export const toggleMusic = () => {
  backgroundMusic.paused
    ? (cassetteInsert.play(),
      (cassetteInsert.onended = () => backgroundMusic.play()))
    : (cassetteEject.play(), backgroundMusic.pause());
};

export const playMeow1 = () => meow1.play();
export const playMeow2 = () => meow2.play();
