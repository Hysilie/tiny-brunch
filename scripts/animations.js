export const animateSprie = (elementId, frames, fps) => {
  const sprite = document.getElementById(elementId);

  let frame = 0;

  setInterval(() => {
    frame = (frame + 1) % frames.length;
    sprite.src = frames[frame];
  }, 1000 / fps);
};
