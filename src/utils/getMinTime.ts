export const getMinTime = (selectedDate?: Date) => {
  const now = new Date();

  const startTime = new Date();
  startTime.setHours(9, 0, 0, 0); // 09:00 AM

  if (!selectedDate) return startTime;

  const isToday = selectedDate.toDateString() === now.toDateString();

  if (isToday && now > startTime) {
    return now;
  }

  return startTime;
};
