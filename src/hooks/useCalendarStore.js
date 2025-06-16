// Este Custom Hook es el encargado de cualquier interacción que yo vaya a hacer con mi STORE  lo voy a hacer a través de este custom hook, asi tengo cenralizada toda mi logica
// Los demás componentes solo van a llamar las funciones o las propiedades que este custom hook exporta.

import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDetleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  // este custom hook toma los eventos del store y los retorna a CalendarPAge

  // Importar el dispatch
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  // si tengo una nota activa tengo un objeto y si no tengo null
  // por eso hayq ue determinar si tengo una nota activa o no

  // funcionalidad para hacer el dispatch de la accion del evento
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
    // hacer el dispacht respectivo que tengo que mandarlo a llamar con el calendarEvent, le mando el valor del argumento esperado
  };

  // Acciones sincronas
  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend

    // Todo bien
    if (calendarEvent._id) {
      // Actualizando , enviamos el payload que en este caso le llamamos calendarEvent
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  // aquí, nosotros vamos a ocupar una función para mandar a hacer el Dispatch de esa accion
  // esta elminacion no es sincrona es asincrona, porque tenemos que llegar al beckend es quien lo elimina y cuando lo elimina el backend va a regresar
  // una respuesta , se elimino correctamente o no se encontro ninguna nota a eliminar etc, entonces deberia llamarse startDeletingEvent
  const startDeletingEvent = () => {
    //Todo: llegar al backend

    dispatch(onDetleteEvent());
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
    startDeletingEvent,
    setActiveEvent,
    // llamo este evento con el payload que esta esperando en el calendarEvent con la accion y se encarga de hacer el dispacht respectivo
    startSavingEvent,
  };
};
