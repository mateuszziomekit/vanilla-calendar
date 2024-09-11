import { generateMonthCalendarDays, today, isTheSameDay } from "./date.js";
import { isEventAllDay, eventStartsBefore } from "./event.js";
import { initEventList } from "./event-list.js";

const calendarTemplateElemenent = document.querySelector("[data-template='month-calendar']");
const calendarDayTemplateElement = document.querySelector("[data-template='month-calendar-day']");

const calendarWeekClasses = {
  4: "four-week",
  5: "five-week",
  6: "six-week"
};

export function initMonthCalendar(parent, selectedDate, eventStore) {
  const calendarContent = calendarTemplateElemenent.content.cloneNode(true);
  const calendarElement = calendarContent.querySelector("[data-month-calendar]");
  const calendarDayListElement = calendarElement.querySelector("[data-month-calendar-day-list]");

  const calendarDays = generateMonthCalendarDays(selectedDate);
  const calendarWeeks = calendarDays / 7;

  const calendarWeekClass = calendarWeekClasses[calendarWeeks];
  calendarElement.classList.add(calendarWeekClass);

  for (const calendarDay of calendarDays) {
    const events = eventStore.getEventsByDate(calendarDay);
    sortCalendarDayEvents(events);

    initCalendarDay(calendarDayListElement, calendarDay, events);
  }

  parent.appendChild(calendarElement);
}

function initCalendarDay(parent, calendarDay, events) {
  const calendarDayContent = calendarDayTemplateElement.content.cloneNode(true);
  const calendarDayElemenent = calendarDayContent.querySelector("[data-month-calendar-day]");
  const calendarDayLabelElemenent = calendarDayContent.querySelector("[data-month-calendar-day-label]");

  if (isTheSameDay(today(), calendarDay)) {
    calendarDayElemenent.classList.add("month-calendar__day--highlight");
  }

  calendarDayLabelElemenent.textContent = calendarDay.getDate();

  initEventList(calendarDayElemenent, events);

  parent.appendChild(calendarDayElemenent);
}

function sortCalendarDayEvents(events) {
  events.sort((eventA, eventB) => {
    if (isEventAllDay(eventA)) {
      return -1;
    }

    if (isEventAllDay(eventB)) {
      return 1;
    }

    return eventStartsBefore(eventA, eventB) ? -1 : 1;
  });
}