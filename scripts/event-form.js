import { validateEvent } from "./event.js";

export function initEventForm() {
  const formElement = document.querySelector("[data-event-form]");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const formEvent = formIntoEvent(formElement);
    const validationError = validateEvent(formEvent);
    if (validationError !== null) {
      alert(validationError);
      return;
    }

    formElement.dispatchEvent(new CustomEvent("event-create", {
      detail: {
        event: formEvent
      },
      bubbles: true
    }));
  });

  return {
    reset() {
      formElement.reset();
    }
  };
}

function formIntoEvent(formElement) {
  const formData = new FormData(formElement);
  const title = formData.get("title");
  const date = formData.get("date");
  const startTime = formData.get("start-time");
  const endTime = formData.get("end-time");
  const color = formData.get("color");

  const event = {
    title,
    date: new Date(date),
    startTime: Number.parseInt(startTime, 10),
    endTime: Number.parseInt(endTime, 10),
    color
  };

  return event;
}