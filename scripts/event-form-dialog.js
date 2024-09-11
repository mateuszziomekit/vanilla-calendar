import { initDialog } from "./dialog.js";
import { initEventForm } from "./event-form.js";
import { initToaster } from "./toaster.js";

export function initEventFormDialog() {
  const dialog = initDialog("event-form");
  const toaster = initToaster(dialog.dialogElement);
  const eventForm = initEventForm(toaster);

  document.addEventListener("event-create-request", () => {
    dialog.open();
  });

  dialog.dialogElement.addEventListener("close", () => {
    eventForm.reset();
  });
}