import { initDialog } from "./dialog.js";
import { initEventForm } from "./event-form.js";

export function initEventFormDialog() {
  const dialog = initDialog("event-form");
  const eventForm = initEventForm();

  document.addEventListener("event-create-request", () => {
    dialog.open();
  });

  dialog.dialogElement.addEventListener("close", () => {
    eventForm.reset();
  });
}