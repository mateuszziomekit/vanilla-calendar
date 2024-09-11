import { generateMonthCalendarDays, today, isTheSameDay } from "./date.js";

const calendarTemplateElemenent = document.querySelector("[data-template='month-calendar']");
const calendarDayTemplateElement = document.querySelector("[data-template='month-calendar-day']");

const calendarWeekClasses = {
  4: "four-week",
  5: "five-week",
  6: "six-week"
};

export function initMonthCalendar(parent, selectedDate) {
  const calendarContent = calendarTemplateElemenent.content.cloneNode(true);
  const calendarElement = calendarContent.querySelector("[data-month-calendar]");
  const calendarDayListElement = calendarElement.querySelector("[data-month-calendar-day-list]");

  const calendarDays = generateMonthCalendarDays(selectedDate);
  const calendarWeeks = calendarDays / 7;

  const calendarWeekClass = calendarWeekClasses[calendarWeeks];
  calendarElement.classList.add(calendarWeekClass);

  for (const calendarDay of calendarDays) {
    initCalendarDay(calendarDayListElement, calendarDay);
  }

  parent.appendChild(calendarElement);
}

function initCalendarDay(parent, calendarDay) {
  const calendarDayContent = calendarDayTemplateElement.content.cloneNode(true);
  const calendarDayElemenent = calendarDayContent.querySelector("[data-month-calendar-day]");
  const calendarDayLabelElemenent = calendarDayContent.querySelector("[data-month-calendar-day-label]");

  if (isTheSameDay(today(), calendarDay)) {
    calendarDayElemenent.classList.add("month-calendar__day--highlight");
  }

  calendarDayLabelElemenent.textContent = calendarDay.getDate();

  parent.appendChild(calendarDayElemenent);
}