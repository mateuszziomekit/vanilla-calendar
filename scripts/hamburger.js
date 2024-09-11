export function initHamburger() {
  const hamburgetButtonElement = document.querySelector("[data-hamburger-button]");

  hamburgetButtonElement.addEventListener("click", () => {
    hamburgetButtonElement.dispatchEvent(new CustomEvent("mobile-sidebar-open-request", {
      bubbles: true
    }));
  });
}