import { getUrlDate } from "./url.js";

export function initEventCreateButtons() {
  const buttonElements = document.querySelectorAll("[data-event-create-button]");

  for (const buttonElement of buttonElements) {
    initEventCreateButton(buttonElement);
  }
}

function initEventCreateButton(buttonElement) {
  let selectedDate = getUrlDate();

  buttonElement.addEventListener("click", () => {
    buttonElement.dispatchEvent(new CustomEvent("event-create-request", {
      detail: {
        date: selectedDate,
        startTime: 600,
        endTime: 960
      },
      bubbles: true
    }));
  });

  document.addEventListener("date-change", (event) => {
    selectedDate = event.detail.date;
  });
}