import { initDialog } from "./dialog.js";

export function initMobileSidebar() {
  const dialog = initDialog("mobile-sidebar");

  document.addEventListener("mobile-sidebar-open-request", () => {
    dialog.open();
  });

  document.addEventListener("date-change", () => {
    dialog.close();
  });
}