import { useState } from "react";

// Importaciones de terceros
import { Calendar } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Importaciones locales
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../";

// helpers
import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  // crear custom hook para sacar esta logica de aqui
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    // console.log({ doubleClick: event });
    openDateModal();
  };

  const onSelect = (event) => {
    // console.log({ click: event });
    // este es el vento que tengo que mandarle a mi funcion
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    // cuando la vista cambia, voy almacenar esto en el local storage, al hacer esto me permite a mi cuando se recarga el navegador web, poder establecerlo
    // console.log({ viewChange: event });
    localStorage.setItem("lastView", event);
    setlastView(event);
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
