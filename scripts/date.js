export function today() {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    12
  );
}

export function addMonths(date, months) {
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + months,
    1,
    date.getHours()
  );
  const lastDayOfMonth = getLastDayOfMonthDate(firstDayOfMonth);

  const dayOfMonth = Math.min(date.getDate(), lastDayOfMonth.getDate());

  return new Date(
    date.getFullYear(),
    date.getMonth() + months,
    dayOfMonth,
    date.getHours()
  );
}

export function subtractMonths(date, months) {
  return addMonths(date, -months);
}

export function addDays(date, days) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + days,
    date.getHours()
  );
}

export function subtractDays(date, days) {
  return addDays(date, -days);
}

function getLastDayOfMonthDate(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    12
  );
}