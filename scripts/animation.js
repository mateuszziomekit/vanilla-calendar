export function waitUntilAnimationsFinish(element) {
  const animationPromises = element.getAnimations().map(animation => animation.finished);

  return Promise.allSettled(animationPromises);
}