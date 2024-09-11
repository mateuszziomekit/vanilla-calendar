import { today } from "./date.js";

export function initEventCreateButton() {
  const buttonElement = document.querySelector("[data-event-create-button]");

  let selectedDate = today();

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