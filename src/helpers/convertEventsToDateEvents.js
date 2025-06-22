import { parseISO } from "date-fns";

export const convertEventsToDateEvents = (events = []) => {
  return events.map((event) => {
    // transformar fecha de inicio y final a formato javascript tpo fecha
    event.end = parseISO(event.end);
    event.start = parseISO(event.start);

    return event;
  });
};
