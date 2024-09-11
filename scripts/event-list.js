import { initStaticEvent } from "./event.js";

const eventListItemTemplateElement = document.querySelector("[data-template='event-list-item']");

export function initEventList(parent, events) {
  const eventListElement = parent.querySelector("[data-event-list]");

  for (const event of events) {
    const eventListItemContent = eventListItemTemplateElement.content.cloneNode(true);
    const eventListItemElement = eventListItemContent.querySelector("[data-event-list-item]");

    initStaticEvent(eventListItemElement, event);

    eventListElement.appendChild(eventListItemElement);
  }
}