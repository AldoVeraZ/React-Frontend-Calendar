import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleaños del Jefe",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Fernando",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
    // hay que determinar si hay una nota activa o no
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      // el payload seria la nueva nota con el id listo para ser insertado a mis eventos
      // gracias a redux toolkit se puede hacer lo siguiente, sin el toolkit no se puede usar el push
      state.events.push(payload);
      // una vez cerrado el modal hay que limpiar la nota activa   SSSSSDDDD
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      // si estoy actualizando el evento significa que ya viene con un id (que viene en el payload)
      // Entonces tengo que buscar cuál es el evento que quiero actualizar o el evento que quiere reemplazar.
      //Entonces, nuevamente, gracias a que estamos con el Redux Toolkit, podemos tomar los eventos y sobre escribirlo de esta manera:
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
          // En el caso en que el Heidy del evento que estoy iterando es igual a lo que me estaba dando en el payload. Entonces voy a hacer un error de el payload a que extraño?
          // Entonces este es el nuevo evento  Ahí viene la idea, ahí viene la información del usuario, ahí viene todo, la nota o el evento activo.
        }

        return event;
      });
      // Map que recuerda que el map ya lo hemos usado mucho, regresa un nuevo arreglo basado en el valor de retorno de este arreglo.
      // regresa un nuevo arreglo basado en el valor de retorno de este arreglo.
      // Es decir, lo que sea que regrese este mapa, esto va a regresar un nuevo arreglo con las modificaciones  y todo.
      // Y lo que sea que regrese va a ser el nuevo valor de nuestros state.events
    },
    onDetleteEvent: (state) => {
      // no se necesita un payload porque la eleminacion consiste en eliminar la ota activa
      // si tenemos ninguna nota activa entonces que la elimine
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        // voy a regresar todos los eventos cuyo id sea diferente al de la nota activa, entonces  aqui fisicamente vamos a eliminarlo del arreglo
        state.activeEvent = null; // lo dejamos igual a null para que ya no tengamos ninguna nota activa
      }
      // de lo contrario no hacer nada
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDetleteEvent,
} = calendarSlice.actions;
