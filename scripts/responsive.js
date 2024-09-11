const isDesktopMediaQuery = window.matchMedia("(min-width: 768px)");

export function initResponsive() {
  if (currentDeviceType() === "mobile") {
    document.dispatchEvent(new CustomEvent("view-change", {
      detail: {
        view: "week"
      },
      bubbles: true
    }));
  }

  isDesktopMediaQuery.addEventListener("change", () => {
    const deviceType = currentDeviceType();

    document.dispatchEvent(new CustomEvent("device-type-change", {
      detail: {
        deviceType
      },
      bubbles: true
    }));

    if (deviceType === "mobile") {
      document.dispatchEvent(new CustomEvent("view-change", {
        detail: {
          view: "week"
        },
        bubbles: true
      }));
    }
  });
}

export function currentDeviceType() {
  return isDesktopMediaQuery.matches ? "desktop" : "mobile";
}
