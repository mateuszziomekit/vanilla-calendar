import { today } from "./date.js";
import { initMonthCalendar } from "./month-calendar.js";
import { initWeekCalendar } from "./week-calendar.js";

export function initCalendar(eventStore) {
  const calendarElement = document.querySelector("[data-calendar]");

  let selectedView = "month";
  let selectedDate = today();

  function refreshCalendar() {
    const calendarScrollableElement = calendarElement.querySelector("[data-calendar-scrollable]");

    const scrollTop = calendarScrollableElement === null ? 0 : calendarScrollableElement.scrollTop;

    calendarElement.replaceChildren();

    if (selectedView === "month") {
      initMonthCalendar(calendarElement, selectedDate, eventStore);
    } else if (selectedView === "week") {
      initWeekCalendar(calendarElement, selectedDate, eventStore, false);
    } else {
      initWeekCalendar(calendarElement, selectedDate, eventStore, true);
    }

    calendarElement.querySelector("[data-calendar-scrollable]").scrollTo({ top: scrollTop });
  }

  document.addEventListener("view-change", (event) => {
    selectedView = event.detail.view;
    refreshCalendar();
  });

  document.addEventListener("date-change", (event) => {
    selectedDate = event.detail.date;
    refreshCalendar();
  });

  document.addEventListener("events-change", () => {
    refreshCalendar();
  });

  refreshCalendar();
}