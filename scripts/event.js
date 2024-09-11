export function validateEvent(event) {
  if (event.startTime >= event.endTime) {
    return "Event end time must be after start time";
  }

  return null;
}