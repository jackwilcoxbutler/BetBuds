import { format, isToday, isTomorrow, parseISO,add } from 'date-fns';

export function formatPrismaDateToLocale(prismaDateTime : string) {
    console.log(prismaDateTime);
    const date = parseISO(prismaDateTime); // Convert the ISO string to a Date object
    const formattedTime = format(date, 'hh:mm a'); // Format time as "11:00 pm"

    let formattedDate;
    if (isToday(date)) {
        formattedDate = 'Today';
    } else if (isTomorrow(date)) {
        formattedDate = 'Tomorrow';
    } else {
        formattedDate = format(date, 'EEEE, MMMM d'); // Format date as "Friday, February X"
    }

    return `${formattedTime}, ${formattedDate}`;
}