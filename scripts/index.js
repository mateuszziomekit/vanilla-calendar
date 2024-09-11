import { initCalendar } from "./calendar.js";
import { initEventCreateButton } from "./event-create-button.js";
import { initEventFormDialog } from "./event-form-dialog.js";
import { initEventStore } from "./event-store.js";
import { initNav } from "./nav.js";
import { initNotifications } from "./notifications.js";
import { initViewSelect } from "./view-select.js";

const eventStore = initEventStore();
initCalendar(eventStore);
initEventCreateButton();
initEventFormDialog();
initNav();
initNotifications();
initViewSelect();