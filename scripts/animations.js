export const animateSprite = (elementId, frames, fps, seconds = 1000) => {
  const sprite = document.getElementById(elementId);

  let frame = 0;

  return setInterval(() => {
    frame = (frame + 1) % frames.length;
    sprite.src = frames[frame];
  }, seconds / fps);
};

export const stopAnimate = (intervalId, elementId, defaultSrc) => {
  clearInterval(intervalId);

  if (elementId && defaultSrc) {
    document.getElementById(elementId).src = defaultSrc;
  }
};