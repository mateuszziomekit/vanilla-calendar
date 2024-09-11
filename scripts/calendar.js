export function initCalendar() {
  const monthCalendarElement = document.querySelector("[data-month-calendar]");
  const weekCalendarElement = document.querySelector("[data-week-calendar]");
  const dayCalendarElement = document.querySelector("[data-day-calendar]");

  document.addEventListener("view-change", (event) => {
    const selectedView = event.detail.view;

    if (selectedView === "month") {
      monthCalendarElement.style.display = "flex";
      weekCalendarElement.style.display = "none";
      dayCalendarElement.style.display = "none";
    } else if (selectedView === "week") {
      monthCalendarElement.style.display = "none";
      weekCalendarElement.style.display = "flex";
      dayCalendarElement.style.display = "none";
    } else {
      monthCalendarElement.style.display = "none";
      weekCalendarElement.style.display = "none";
      dayCalendarElement.style.display = "flex";
    }
  });
}