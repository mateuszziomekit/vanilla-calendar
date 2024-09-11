import { today } from "./date.js";

export function initUrl() {
  let selectedView = getUrlView();
  let selectedDate = getUrlDate();

  function updateUrl() {
    const url = new URL(window.location);

    url.searchParams.set("view", selectedView);
    url.searchParams.set("date", selectedDate.toISOString());

    history.replaceState(null, "", url);
  }

  document.addEventListener("view-change", (event) => {
    selectedView = event.detail.view;
    updateUrl();
  });

  document.addEventListener("date-change", (event) => {
    selectedDate = event.detail.date;
    updateUrl();
  });
}

export function getUrlView() {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get("view") || "month";
}

export function getUrlDate() {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get("date");

  return date ? new Date(date) : today();
}
