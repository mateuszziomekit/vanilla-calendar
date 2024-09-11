const eventTemplateElement = document.querySelector("[data-template='event']");

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric"
});

export function initStaticEvent(parent, event) {
  const eventElement = initEvent(event);

  if (isEventAllDay(event)) {
    eventElement.classList.add("event--filled");
  }

  parent.appendChild(eventElement);
}

export function initDynamicEvent(parent, event, dynamicStyles) {
  const eventElement = initEvent(event);

  eventElement.classList.add("event--filled");
  eventElement.classList.add("event--dynamic");

  eventElement.style.top = dynamicStyles.top;
  eventElement.style.left = dynamicStyles.left;
  eventElement.style.bottom = dynamicStyles.bottom;
  eventElement.style.right = dynamicStyles.right;

  eventElement.dataset.eventDynamic = true;

  parent.appendChild(eventElement);
}

function initEvent(event) {
  const eventContent = eventTemplateElement.content.cloneNode(true);
  const eventElement = eventContent.querySelector("[data-event]");
  const eventTitleElement = eventElement.querySelector("[data-event-title]");
  const eventStartTimeElement = eventElement.querySelector("[data-event-start-time]");
  const eventEndTimeElement = eventElement.querySelector("[data-event-end-time]");

  const startDate = eventTimeToDate(event, event.startTime);
  const endDate = eventTimeToDate(event, event.endTime);

  eventElement.style.setProperty("--event-color", event.color);
  eventTitleElement.textContent = event.title;
  eventStartTimeElement.textContent = dateFormatter.format(startDate);
  eventEndTimeElement.textContent = dateFormatter.format(endDate);

  eventElement.addEventListener("click", () => {
    eventElement.dispatchEvent(new CustomEvent("event-click", {
      detail: {
        event,
      },
      bubbles: true
    }));
  });

  return eventElement;
}

export function isEventAllDay(event) {
  return event.startTime === 0 && event.endTime === 1440;
}

export function eventStartsBefore(eventA, eventB) {
  return eventA.startTime < eventB.startTime;
}

export function eventEndsBefore(eventA, eventB) {
  return eventA.endTime < eventB.eventTime;
}

export function eventCollidesWith(eventA, eventB) {
  const maxStartTime = Math.max(eventA.startTime, eventB.startTime);
  const minEndTime = Math.min(eventA.endTime, eventB.endTime);

  return minEndTime > maxStartTime;
}

export function eventTimeToDate(event, eventTime) {
  return new Date(
    event.date.getFullYear(),
    event.date.getMonth(),
    event.date.getDate(),
    0,
    eventTime
  );
}

export function validateEvent(event) {
  if (event.startTime >= event.endTime) {
    return "Event end time must be after start time";
  }

  return null;
}

export function adjustDynamicEventMaxLines(dynamicEventElement) {
  const availableHeight = dynamicEventElement.offsetHeight;
  const lineHeight = 16;
  const padding = 8;
  const maxTitleLines = Math.floor((availableHeight - lineHeight - padding) / lineHeight);

  dynamicEventElement.style.setProperty("--event-title-max-lines", maxTitleLines);
}

export function generateEventId() {
  return Date.now();
}