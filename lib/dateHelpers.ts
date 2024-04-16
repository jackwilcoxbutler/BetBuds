import { format, isToday, isTomorrow } from 'date-fns';

export function formatPrismaDateToLocale(prismaDateTime: string): string {
  const date = new Date(prismaDateTime); // Convert the ISO string to a Date object
  const formattedTime = format(date, 'hh:mm a'); // Format time as "11:00 PM"

  let formattedDate = '';

  if (isToday(date)) {
    formattedDate = 'Today';
  } else if (isTomorrow(date)) {
    formattedDate = 'Tomorrow';
  } else {
    formattedDate = format(date, 'MMMM d'); // Format as "Month day", e.g., "April 15"
  }

  return `${formattedTime}, ${formattedDate}`;
}

import { formatISO } from 'date-fns';

// Function to get the beginning and end of the current day in the local timezone as UTC
export const getDayBoundsInUTC = (): { startOfDayUTC: string, endOfDayUTC: string} => {
  // Create a date object for now
  const now = new Date();

  // Get the current timezone offset in minutes and convert it to milliseconds
  const timezoneOffset = now.getTimezoneOffset() * 60000;

  // Calculate the start of the day in local time, then adjust to UTC
  const startOfDayLocal = new Date(now.setHours(0, 0, 0, 0));
  const startOfDayUTC = new Date(startOfDayLocal.getTime() - timezoneOffset);

  // Calculate the end of the day in local time, then adjust to UTC
  const endOfDayLocal = new Date(now.setHours(23, 59, 59, 999));
  const endOfDayUTC = new Date(endOfDayLocal.getTime() - timezoneOffset);

  // Format dates to ISO string (optional, depending on your requirement)
  const formattedStart = formatISO(startOfDayUTC);
  const formattedEnd = formatISO(endOfDayUTC);

  return {
    startOfDayUTC: formattedStart,
    endOfDayUTC: formattedEnd
  };
};

export const getNowInUTC = (): string => {
    // Create a date object for now
    const now = new Date();
  
    // Get the current timezone offset in minutes and convert it to milliseconds
    const timezoneOffset = now.getTimezoneOffset() * 60000;
  
    // Calculate the start of the day in local time, then adjust to UTC
    const nowUTC = new Date(now.getTime() + timezoneOffset);
  
    // Calculate the end of the day in local time, then adjust to UTC
    const nowUTCFormatted = formatISO(nowUTC);

    return nowUTCFormatted
  };

