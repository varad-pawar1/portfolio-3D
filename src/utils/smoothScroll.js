export function smoothScrollToTop(duration = 800) {
  const startTop = window.scrollY;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startTop * (1 - easeInOutCubic(progress)));
    if (elapsed < duration) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Smooth scroll to a section with easing, offset for fixed navbar.
 * @param {string} id - element id to scroll to
 * @param {number} duration - animation duration in ms
 */
export function smoothScrollTo(id, duration = 900) {
  const target = document.getElementById(id);
  if (!target) return;

  const navbarHeight = 72; // fixed navbar height in px
  const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  let startTime = null;

  // Ease in-out cubic
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startTop + distance * eased);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
