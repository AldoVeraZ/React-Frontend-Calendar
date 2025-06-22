// Este Custom Hook es el encargado de cualquier interacción que yo vaya a hacer con mi STORE  lo voy a hacer a través de este custom hook, asi tengo cenralizada toda mi logica
// Los demás componentes solo van a llamar las funciones o las propiedades que este custom hook exporta.

import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDetleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  // este custom hook toma los eventos del store y los retorna a CalendarPAge

  // Importar el dispatch
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  // si tengo una nota activa tengo un objeto y si no tengo null
  // por eso hayq ue determinar si tengo una nota activa o no

  const { user } = useSelector((state) => state.auth);

  // funcionalidad para hacer el dispatch de la accion del evento
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
    // hacer el dispacht respectivo que tengo que mandarlo a llamar con el calendarEvent, le mando el valor del argumento esperado
  };

  // Acciones sincronas
  const startSavingEvent = async (calendarEvent) => {
    // TODO: Update event
    // Manejar el error:
    try {
      if (calendarEvent.id) {
        // Actualizando , enviamos el payload que en este caso le llamamos calendarEvent
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Creando (CREACIÓN DEL EVENTO)
      const { data } = await calendarApi.post("/events", calendarEvent);
      // console.log({ data });
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  // aquí, nosotros vamos a ocupar una función para mandar a hacer el Dispatch de esa accion
  // esta elminacion no es sincrona es asincrona, porque tenemos que llegar al beckend es quien lo elimina y cuando lo elimina el backend va a regresar
  // una respuesta , se elimino correctamente o no se encontro ninguna nota a eliminar etc, entonces deberia llamarse startDeletingEvent
  const startDeletingEvent = async () => {
    //Todo: llegar al backend
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDetleteEvent());
      return;
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      // llegar al backend
      const { data } = await calendarApi.get("/events");
      // console.log({ data });
      // la data viene en data eventos eso hay que llamar
      // le pasamos como argumento, data.eventos que asi lo tenemos en el backend
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
      // console.log(events);
    } catch (error) {
      console.log("error cargando eventos");
      console.log(error);
    }
  };

  return {
    // * Propiedades
    events,
    activeEvent,
    // * nuvea propiedad
    hasEventSelected: !!activeEvent,
    // si activeEvent es null entonces va a regresar falso y si tiene un objeto entonces va a regresar true,
    // entonces con esto ya puedo saber si hay un evento seleccionado o no

    // * Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    // llamo este evento con el payload que esta esperando en el calendarEvent con la accion y se encarga de hacer el dispacht respectivo
    startSavingEvent,
    startDeletingEvent,
  };
};
