import { today, addDays, addMonths, subtractDays, subtractMonths } from "./date.js";
import { getUrlDate, getUrlView } from "./url.js";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric"
});

export function initNav() {
  const todayButtonElements = document.querySelectorAll("[data-nav-today-button]");
  const previousButtonElement = document.querySelector("[data-nav-previous-button]");
  const nextButtonElement = document.querySelector("[data-nav-next-button]");
  const dateElement = document.querySelector("[data-nav-date]");

  let selectedView = getUrlView();
  let selectedDate = getUrlDate();

  for (const todayButtonElement of todayButtonElements) {
    todayButtonElement.addEventListener("click", () => {
      todayButtonElement.dispatchEvent(new CustomEvent("date-change", {
        detail: {
          date: today()
        },
        bubbles: true
      }));
    });
  }

  previousButtonElement.addEventListener("click", () => {
    previousButtonElement.dispatchEvent(new CustomEvent("date-change", {
      detail: {
        date: getPreviousDate(selectedView, selectedDate)
      },
      bubbles: true
    }));
  });

  nextButtonElement.addEventListener("click", () => {
    nextButtonElement.dispatchEvent(new CustomEvent("date-change", {
      detail: {
        date: getNextDate(selectedView, selectedDate)
      },
      bubbles: true
    }));
  });

  document.addEventListener("view-change", (event) => {
    selectedView = event.detail.view;
  });

  document.addEventListener("date-change", (event) => {
    selectedDate = event.detail.date;
    refreshDateElement(dateElement, selectedDate);
  });

  refreshDateElement(dateElement, selectedDate);
}

function refreshDateElement(dateElement, selectedDate) {
  dateElement.textContent = dateFormatter.format(selectedDate);
}

function getPreviousDate(selectedView, selectedDate) {
  if (selectedView === "day") {
    return subtractDays(selectedDate, 1);
  }

  if (selectedView === "week") {
    return subtractDays(selectedDate, 7);
  }

  return subtractMonths(selectedDate, 1);
}

function getNextDate(selectedView, selectedDate) {
  if (selectedView === "day") {
    return addDays(selectedDate, 1);
  }

  if (selectedView === "week") {
    return addDays(selectedDate, 7);
  }

  return addMonths(selectedDate, 1);
}